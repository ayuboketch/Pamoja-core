#!/bin/bash

# Check if keyFile exists, create it if not
KEYFILE_DIR="/data/mongodb-keyfile"
KEYFILE_PATH="${KEYFILE_DIR}/mongodb-keyfile"

echo "Checking for MongoDB keyFile..."
if [ ! -f "$KEYFILE_PATH" ]; then
  echo "MongoDB keyFile not found. Generating..."
  mkdir -p "$KEYFILE_DIR"
  openssl rand -base64 756 >"$KEYFILE_PATH"
  chmod 400 "$KEYFILE_PATH"
  # Ensure the keyfile is accessible by MongoDB
  chown 999:999 "$KEYFILE_PATH"
  echo "MongoDB keyFile generated at $KEYFILE_PATH"
else
  echo "Using existing MongoDB keyFile"
fi

# Wait for MongoDB servers to be available
echo "Waiting for MongoDB servers to start..."
sleep 10

# Initialize replica set
echo "Initializing MongoDB replica set..."

mongosh admin --host mongo1:27017 --username $MONGO_ROOT_USERNAME --password $MONGO_ROOT_PASSWORD --eval "
rs.initiate({
  _id: 'rs0',
  members: [
    { _id: 0, host: 'mongo1:27017', priority: 3 },
    { _id: 1, host: 'mongo2:27018', priority: 2 },
    { _id: 2, host: 'mongo3:27019', priority: 1 }
  ]
})
"

# Wait for replica set to initialize
echo "Waiting for replica set initialization..."
sleep 10

# Create application database and user
echo "Creating application database and user..."
mongosh admin --host mongo1:27017 --username $MONGO_ROOT_USERNAME --password $MONGO_ROOT_PASSWORD --eval "
db = db.getSiblingDB('$MONGO_DATABASE');
db.createUser({
  user: 'app_user',
  pwd: 'app_password',
  roles: [
    { role: 'readWrite', db: '$MONGO_DATABASE' }
  ]
});

// Create collections with validation schemas
db.createCollection('users', {
  validator: {
    \$jsonSchema: {
      bsonType: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        },
        password: {
          bsonType: 'string',
          minLength: 6
        }
      }
    }
  }
});

db.createCollection('jobs');
db.createCollection('chats');
db.createCollection('reviews');
db.createCollection('resources');
db.createCollection('events');
db.createCollection('forums');
db.createCollection('notifications');

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.jobs.createIndex({ createdAt: -1 });
db.chats.createIndex({ participants: 1 });
db.resources.createIndex({ tags: 1 });
"

echo "MongoDB setup completed successfully."
