#!/bin/bash

start_dev() {
    echo "Starting Pamoja Platform in development mode..."
    docker-compose up -d
}

start_prod() {
    echo "Starting Pamoja Platform in production mode..."
    docker-compose -f docker-compose.prod.yml up -d
}

stop() {
    echo "Stopping Pamoja Platform containers..."
    docker-compose down
}

logs() {
    echo "Displaying logs for all services..."
    docker-compose logs -f
}

logs_service() {
    echo "Displaying logs for $1 service..."
    docker-compose logs -f $1
}

rebuild() {
    echo "Rebuilding $1 service..."
    docker-compose build --no-cache $1
    docker-compose up -d $1
}

db_backup() {
    echo "Creating MongoDB backup..."
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_DIR="./backups"
    mkdir -p $BACKUP_DIR

    docker-compose exec -T mongo1 mongodump --host localhost:27017 --username $MONGO_ROOT_USERNAME --password $MONGO_ROOT_PASSWORD --authenticationDatabase admin --db $MONGO_DATABASE --out /tmp/backup

    docker cp $(docker-compose ps -q mongo1):/tmp/backup $BACKUP_DIR/mongodb_backup_$TIMESTAMP

    echo "Backup created at $BACKUP_DIR/mongodb_backup_$TIMESTAMP"
}

db_restore() {
    echo "Restoring MongoDB from backup $1..."

    docker cp $1 $(docker-compose ps -q mongo1):/tmp/restore

    docker-compose exec -T mongo1 mongorestore --host localhost:27017 --username $MONGO_ROOT_USERNAME --password $MONGO_ROOT_PASSWORD --authenticationDatabase admin --db $MONGO_DATABASE /tmp/restore/$MONGO_DATABASE

    echo "Restore completed."
}

check_replica() {
    echo "Checking MongoDB replica set status..."
    docker-compose exec mongo1 mongosh --host mongo1:27017 --username $MONGO_ROOT_USERNAME --password $MONGO_ROOT_PASSWORD --eval "rs.status()"
}

usage() {
    echo "Pamoja Platform Docker Commands"
    echo "--------------------------------"
    echo "Usage: ./pamoja.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start:dev         - Start development environment"
    echo "  start:prod        - Start production environment"
    echo "  stop              - Stop all containers"
    echo "  logs              - View logs for all services"
    echo "  logs:service [s]  - View logs for specific service"
    echo "  rebuild [service] - Rebuild a specific service"
    echo "  db:backup         - Create MongoDB backup"
    echo "  db:restore [dir]  - Restore MongoDB from backup"
    echo "  db:status         - Check replica set status"
    echo "  help              - Show this help message"
}

case "$1" in
"start:dev")
    start_dev
    ;;
"start:prod")
    start_prod
    ;;
"stop")
    stop
    ;;
"logs")
    logs
    ;;
"logs:service")
    logs_service $2
    ;;
"rebuild")
    rebuild $2
    ;;
"db:backup")
    db_backup
    ;;
"db:restore")
    db_restore $2
    ;;
"db:status")
    check_replica
    ;;
"help" | *)
    usage
    ;;
esac
