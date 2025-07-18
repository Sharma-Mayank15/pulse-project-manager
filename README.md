 
# Pulse Tasks

## Overview

**Pulse Tasks** is a powerful project and task management tool designed to streamline your workflow. With robust features like real-time task updates, intuitive project boards, and secure user authentication, Pulse Tasks makes team collaboration and personal productivity seamless. Built using modern, scalable technologies including Django, ReactJS, PostgreSQL, Redis, and Docker.

## 🔑 Key Features

1. **JWT Authentication**: Secure user registration and login flow using JSON Web Tokens (JWT) to ensure protected access.

2. **Project Dashboard**: Visual overview of all user-created projects, neatly organized for efficient access and tracking.

3. **Task Management**:
   - Add, edit, or delete tasks inside projects.
   - Track task statuses like: `Todo`, `In Progress`, `Review`, and `Done`.
   - Assignments and modifications reflect across all active sessions — try it in multiple browsers!

4. **⚡ Real-time Collaboration**:
   - Built with Django Channels and Redis to enable websocket-based updates.
   - Changes made to any task/project are instantly visible to all users without needing to refresh.

## 🛠 Tech Stack

### Frontend:
- ReactJS

### Backend:
- Django REST Framework
- Django Channels

### Database:
- PostgreSQL

### Real-time Engine:
- Redis (Pub/Sub via WebSockets)

### Containerization:
- Docker

## 🚀 Getting Started

1. **Clone the Repository**:

```bash
git clone https://github.com/Sharma-Mayank15/pulse-project-manager.git
```

2. **Navigate to Project Folder**:

```bash
cd oh-prom
```

3. **Build and Start the Application**:

```bash
docker-compose up --build
```

4. **Access the App**:

Open your browser and go to:

```
http://localhost:3000
```

> Make sure Docker and Docker Compose are installed and running.

## 🧪 Test Real-time Feature

To see real-time updates in action:
- Open the app in two different browser windows or devices.
- Modify a task in one window.
- Watch it instantly update in the other — no refresh needed.

## 📄 License

MIT License 
