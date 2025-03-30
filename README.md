# Pamoja Community Platform

## Overview

Pamoja Community Platform is a comprehensive web application designed to support Kenyan software developers by creating a supportive ecosystem that bridges the gap between developers, recruiters, HR professionals, and tech leaders. The platform facilitates networking, job searching, resource sharing, and community building.

## Technology Stack

The Pamoja Platform is built using the MERN stack with real-time features:

- **M**ongoDB - NoSQL database
- **E**xpress.js - Web application framework
- **R**eact.js - Frontend library
- **N**ode.js - JavaScript runtime environment
- **Socket.io** - Real-time bidirectional communication
- **MongoDB Change Streams** - For reactive data updates

## System Architecture

### Client Layer

The client layer is built with React.js and includes:

- React components organized by feature
- Redux for state management
- Socket.io client for real-time communication
- React Router for navigation
- Material UI / Tailwind CSS for responsive design

### Server Layer

The server layer uses Express.js on Node.js:

- RESTful API endpoints for CRUD operations
- JWT authentication middleware
- Socket.io server for real-time features
- MongoDB change streams monitoring
- Express middleware for request processing

### Database Layer

MongoDB serves as the database with the following collections:

- Users - Store user profiles, credentials, and relationships
- Jobs - Job listings and application status
- Chats - Message history and conversation metadata
- Reviews - CV reviews and feedback
- Resources - Shared learning materials and documents
- Events - Community events and meetups
- Forums - Discussion threads and comments
- Notifications - System and user notifications

### Real-time Features

The platform implements several real-time features powered by Socket.io and MongoDB change streams:

- Live chat messaging - For direct and group communications
- Instant notifications - For job updates, mentions, and system alerts
- Real-time CV review updates - Feedback notifications and comments
- Live job board updates - New postings and application status changes
- Announcement broadcasts - Community-wide important messages

## Key Components & Data Flow

### Authentication Flow

1. User registers or logs in
2. Server validates credentials
3. JWT token issued to client
4. Token stored in local storage
5. Protected routes check token validity

### Messaging System

1. User joins a chat room
2. Messages stored in MongoDB
3. Change streams detect new messages
4. Socket.io broadcasts updates to relevant clients
5. UI updates in real-time

### Job Application Workflow

1. Recruiter posts job
2. Job appears on job board
3. Developers apply with profile/CV
4. Recruiters review applications
5. Status updates trigger notifications

### CV Review System

1. Developer uploads CV for review
2. Mentors/peers receive notification
3. Reviewers provide feedback
4. Change streams detect updates
5. Real-time notifications sent to the developer

## Directory Structure

```
pamoja-platform/
├── client/                # React frontend application
│   ├── public/            # Static assets
│   └── src/               # Source code
│       ├── assets/        # Images, icons, etc.
│       ├── components/    # React components
│       ├── context/       # React context providers
│       ├── hooks/         # Custom React hooks
│       ├── pages/         # Page components
│       ├── redux/         # State management
│       ├── services/      # API service connectors
│       ├── socket/        # Socket.io client setup
│       └── utils/         # Utility functions
├── server/                # Express backend application
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Express middleware
│   ├── models/            # MongoDB schema models
│   ├── routes/            # API route definitions
│   ├── socket/            # Socket.io event handlers
│   └── utils/             # Utility functions
└── README.md              # Project documentation
```

## Database Design

### Primary Collections

The MongoDB database is structured around the following core collections:

**Users Collection**

- Personal information
- Professional profile details
- Skills and expertise
- Connection relationships
- Account settings

**Jobs Collection**

- Job descriptions and requirements
- Company information
- Application tracking
- Status indicators
- Visibility settings

**Chats Collection**

- Message history
- Participants information
- Read receipts
- Timestamps
- Chat types (direct/group)

**Reviews Collection**

- CV document references
- Reviewer information
- Feedback comments
- Version tracking
- Status indicators

**Resources Collection**

- Document metadata
- File references
- Categories and tags
- Access permissions
- Version history

## Socket.io Architecture

Socket.io is implemented to handle all real-time communication features:

- Connection management for users
- Room-based communication for specific contexts
- Event-based messaging system
- Broadcast capabilities for announcements
- Private messaging between users

## MongoDB Change Streams Integration

Change streams are used to monitor database changes and trigger real-time events:

- Document insertion detection (new messages, jobs, etc.)
- Document update tracking (status changes, edits)
- Collection-specific listeners for targeted updates
- Pipeline filters to reduce unnecessary event triggers
- Event transformation for client consumption

## Data Protection Measures

- **Authentication**: JWT-based authentication with token expiration
- **Authorization**: Role-based access control for different user types
- **Data Encryption**: Passwords hashed using bcrypt
- **Input Validation**: Server-side validation for all user inputs
- **Error Handling**: Comprehensive error handling to prevent information leakage
- **Rate Limiting**: API rate limiting to prevent abuse
- **Regular Backups**: Automated database backups

## Scalability Considerations

- **Horizontal Scaling**: Ability to add more server instances
- **Database Indexing**: Optimized MongoDB indexes for query performance
- **Caching**: Implementation of Redis for frequent data caching
- **Pagination**: API endpoints support pagination for large result sets
- **Code Splitting**: Frontend code splitting for optimized loading
- **Lazy Loading**: Components and resources loaded on demand

## Development Environment Setup

The platform requires the following to be set up locally:

- Docker and Docker Compose
- Git

All services run in containers, so no need for local Node.js installation.

## Environment Configuration

The application uses environment variables for configuration:

- `.env.development` - Development environment variables
- `.env.production` - Production environment variables (create this file for production deployment)

Key environment variables include:

- MongoDB connection credentials
- JWT configuration
- Server and client ports
- Docker environment settings

## Running the Application

The project includes a helper script `pamoja.sh` that simplifies Docker operations:

### Starting the Application

1. Start in development mode:

```bash
./pamoja.sh start:dev
```

2. Start in production mode:

```bash
./pamoja.sh start:prod
```

### Managing the Application

3. Stop all containers:

```bash
./pamoja.sh stop
```

4. View logs for all services:

```bash
./pamoja.sh logs
```

5. View logs for a specific service:

```bash
./pamoja.sh logs:service <service-name>
```

Example: `./pamoja.sh logs:service server`

6. Rebuild a specific service:

```bash
./pamoja.sh rebuild <service-name>
```

Example: `./pamoja.sh rebuild client`

### Database Management

7. Create a MongoDB backup:

```bash
./pamoja.sh db:backup
```

Backups are saved to the `./backups` directory.

8. Restore a MongoDB backup:

```bash
./pamoja.sh db:restore <backup-directory>
```

9. Check MongoDB replica set status:

```bash
./pamoja.sh db:status
```

10. Display help information:

```bash
./pamoja.sh help
```

## Project Structure

```
pamoja-platform/
├── client/                # React frontend application
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   └── docker/            # Docker configuration files
├── server/                # Express backend application
│   ├── src/               # Server source code
│   └── docker/            # Docker configuration files
├── mongo-init/            # MongoDB initialization scripts
├── scripts/               # Utility scripts including mongo-init.sh
├── docker-compose.yml     # Development Docker Compose configuration
├── docker-compose.prod.yml # Production Docker Compose configuration
├── .env.development       # Development environment variables
├── pamoja.sh              # Helper script for Docker operations
└── README.md              # Project documentation
```

## Docker Architecture

The platform runs using Docker Compose with the following services:

- **client**: React frontend application
- **server**: Express.js backend API
- **mongo1**, **mongo2**, **mongo3**: MongoDB replica set for high availability
- **mongo-express**: Web-based MongoDB admin interface (development only)
- **mongo-init**: Service to initialize the MongoDB replica set

The MongoDB setup uses a replica set configuration for data redundancy and high availability.

---

Developed with 💙 for the Pamoja Community
