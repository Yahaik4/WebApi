# WebApi
This application features a frontend built with Handlebars and a Node.js backend. It integrates Redis and MongoDB, deployed via Docker Swarm to ensure load balancing and high availability across the services.
## Requirements
1. **Docker & Docker Compose**: Make sure Docker and Docker Compose are installed on your system.
2. **Docker Swarm Setup**: Initialize Docker Swarm for container orchestration.
3. **Port Availability**: Ensure that the following ports are free, as they are essential for the services:
   - **3000**: Backend
   - **8080**: Frontend
   - **27017**: MongoDB
   - **6379**: Redis
## Project Structure
- `docker-compose.yml`: Docker Compose configuration for the project.
- `frontend/`: The frontend source code.
- `backend/`: The backend source code.
- `nginx.conf`: The Nginx configuration file for reverse proxy.
  
## Docker Setup

### Level 1 - Simple Docker Setup

This setup includes:

- **Frontend**: A Node.js-based frontend (e.g., using Handlebars).
- **Backend**: A Node.js backend that communicates with MongoDB and Redis.
- **MongoDB**: A MongoDB instance for data storage.
- **Redis**: A Redis instance used for caching.
- **Nginx**: A reverse proxy for load balancing between multiple backend containers.
  
### Level 2 - Scalable System

- The backend service is scaled to 3 replicas.
- Load balancing is implemented through Nginx.
- Redis is used to decouple services for improved performance.

### Level 3 - Docker Swarm Deployment

This project requires Docker Swarm for full functionality. The services are deployed in a Swarm cluster for scalability, availability, and improved service management.

## Running the Project

### Step 1: Clone the Repository (if not already present)
If you haven't cloned the repository yet, you can do so by running:
```bash
git clone git@github.com:cuonglamphu/Docker-Orchestration-Practice.git
cd Docker-Orchestration-Practice
```
### Step 2: Initialize Docker Swarm (if not done already)
To enable Docker Swarm mode, run:
 ```bash
docker swarm init
```
### Step 3: Build Docker Images
To build the Docker images for both frontend and backend, run:
 ```bash
docker-compose build
```
### Step 4: Deploy the Stack
Deploy the stack in Docker Swarm:
 ```bash
docker stack deploy -c docker-compose.yml project-name
```
This will create and deploy the services as defined in your docker-compose.yml file.
### Step 5: Verify the Deployment
You can verify the deployment using:
 ```bash
docker service ls
```
This will list all running services, including the scaled backend services.

### Step 6: Access the Application
Once the services are successfully deployed and running in Docker Swarm, you can access the application:

- **Frontend**: Open your browser and go to `http://localhost:8080`. This will load the frontend UI of the application, where you can interact with it and test the features.
  
- **Backend API**: The backend API is accessible through the Nginx reverse proxy, which listens on port 3000. You can access the backend endpoints by visiting `http://localhost:3000`. This is where you can test the API functionality.

### Step 7: Stopping the Services
To stop the services, run:
 ```bash
docker stack rm project-name
```
This will remove all services and stop the Docker Swarm stack.

## Testing the Application



