# RevaDo – The Next-Gen Full-Stack Todo Platform

RevaDo is a modern full-stack task management application built with Spring Boot, SQLite, and Angular. It is designed to be secure, scalable, and container-ready while remaining lightweight enough to run locally or inside Docker. This project demonstrates real-world full-stack development, including RESTful APIs, JWT-based authentication, database persistence, frontend state management, and Docker containerization.

RevaDo allows users to register and log in securely, create and manage todo items, add subtasks to each todo, edit and delete both todos and subtasks, and mark items as complete. Each user manages their own tasks, and all protected routes require valid JWT authentication.

The backend is built using Java 21, Spring Boot 3, Spring Security, Spring Data JPA, Hibernate, and SQLite. It follows a layered architecture structure: Controller → Service → Repository → Database. SQLite is used as a lightweight file-based database for persistence. The core entities include User, Todo, and Subtask, where one User can have multiple Todos and each Todo can contain multiple Subtasks.

The frontend is built using Angular and TypeScript with Reactive Forms, HTTP Interceptors, and Route Guards. It communicates with the backend via REST APIs and automatically attaches JWT tokens to secure requests.

The backend is fully containerized using Docker and supports volume mounting to persist the SQLite database file. It can be built and run using:

docker build -t revado-backend .
docker run --name revado-backend -p 8081:8080 -d -v ${PWD}/revado.db:/app/revado.db revado-backend

Application health can be monitored through the Spring Boot Actuator endpoint:

http://localhost:8081/actuator/health

RevaDo demonstrates secure authentication workflows, full CRUD operations, proper backend layering, frontend-backend integration, persistent storage management, and containerized deployment in a production-style structure.