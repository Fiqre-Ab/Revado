RevaDo – A Full-Stack Todo Platform

RevaDo is a full-stack task management application built with Spring Boot, SQLite, and Angular. It’s designed to be simple, secure, and scalable — while still being lightweight enough to run locally or inside Docker.

This project was built to demonstrate real-world full-stack development: backend APIs, authentication with JWT, database persistence, frontend state management, and containerization.

What It Does

RevaDo allows users to:

Register and log in securely

Create, edit, and delete todo items

Mark todos as complete

Add subtasks to each todo

Edit, delete, and complete subtasks

Each user manages their own set of tasks, and all routes are protected using JWT authentication.

How It’s Built
Backend

Java 21

Spring Boot 3

Spring Security with JWT

Spring Data JPA

Hibernate

SQLite for persistence

The backend follows a layered architecture:
Controller → Service → Repository → Database

Frontend

Angular

TypeScript

Reactive Forms

HTTP Interceptors

Route Guards

The frontend communicates with the backend through REST APIs and attaches JWT tokens automatically using an interceptor.

Database

SQLite is used as a lightweight file-based database.
Entity structure includes:

User

Todo

Subtask

A user can have multiple todos, and each todo can have multiple subtasks.

Docker Support

The backend is containerized with Docker and supports volume mounting for persistent database storage.

docker build -t revado-backend .
docker run --name revado-backend -p 8081:8080 -d -v ${PWD}/revado.db:/app/revado.db revado-backend
Health check endpoint:
http://localhost:8081/actuator/health