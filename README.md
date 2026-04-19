# Task Manager / DevOps Dashboard

A MERN stack application ready for CI/CD integration with Jenkins, Docker, and Kubernetes.

## Features
- JWT Authentication
- Task Management (CRUD)
- Dashboard Metrics with Charts
- Swagger API Docs (`/api-docs`)
- Health Check Endpoint (`/api/health`)

## Tech Stack
- Frontend: Vite, React, Vanilla CSS, Recharts
- Backend: Node.js, Express, Mongoose, Jest
- Database: MongoDB
- DevOps: Docker, Docker Compose

## Getting Started

1. Clone or copy the project code.
2. Ensure you have Docker and Docker Compose installed.
3. Run the following command in the root directory:
   ```bash
   docker-compose up --build
   ```

4. The application will be available at:
   - Frontend app: `http://localhost:80` (or simply `http://localhost`)
   - Backend API: `http://localhost:5000/api`
   - Swagger Documentation: `http://localhost:5000/api-docs`

## Environment Variables
A `.env.sample` is provided in the `backend/` directory. If running locally without docker-compose, copy it to `.env` and configure accordingly.
