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

- Node.js (v14+)
- Docker
- npm or yarn
- Git

## Environment Configuration

The application uses environment variables for configuration:

- Server port
- MongoDB connection string
- JWT secret key
- Socket.io configuration
- Environment indicator (development/production)

## Running the application

1. Start the development environment

```bash
./pamoja.sh start:dev
```

2. Start the production environment

```bash
./pamoja.sh start:prod
```

3. Stop the application

```bash
./pamoja.sh stop
```

4. View the logs

```bash
./pamoja.sh logs
```

5. Rebuild the application

```bash
./pamoja.sh rebuild
```

## Deployment Strategy

The application can be deployed using:

- Container-based deployment (Docker)
- CI/CD pipeline automation
- Database backup and migration procedures

---

Developed with 💙 for the Pamoja Community
