# multi-container-application
Use Docker Compose to run a multi-container application

The goal of this project is to practice using Docker Compose to run a multi-container application in production. You will use Docker Compose to run a Node.js application and a MongoDB database.

## TL;DR
To run this multi-container application locally using Docker, follow these steps:

Make sure Docker and Docker Compose are installed on your machine before starting.

1. **Clone the repository**:
    ```bash
    git clone https://github.com/kvnrizki/multi-container-application.git
    cd multi-container-application
    ```

2. **Build and run the containers**:
    ```bash
    docker-compose up --build
    ```

3. **Access the API**:
    Open your browser and navigate to `http://localhost:3000` to interact with the API.

4. **Persist data**:
    Ensure that your MongoDB container is configured to persist data by using a volume in your `docker-compose.yml`.

5. **Stop the containers**:
    To stop the application, press `CTRL+C` in the terminal where the containers are running, or run:
    ```bash
    docker-compose down
    ```

## Requirements
Create a simple unauthenticated Node.js API service for creating a simple todo list. The API should have the following endpoints:

* `GET /todos` — get all todos
* `POST /todos` — create a new todo
* `GET /todos/:id` — get a single todo by id
* `PUT /todos/:id` — update a single todo by id
* `DELETE /todos/:id` — delete a single todo by id

The API should connect to MongoDB to store the todo items. You can use [Express](https://expressjs.com/) for the API and [Mongoose](https://mongoosejs.com/) to connect to MongoDB. You can use `nodemon` to automatically restart the server when the source code changes.`

### Requirement #1 - Dockerize the API
You are required to dockerize the API and have a `docker-compose.yml` file which will spin up a [MongoDB container](https://hub.docker.com/_/mongo) and the API container. If everything works, you should be able to access the API via `http://localhost:3000` and the todos should be saved to the MongoDB container. Data should be persisted when the containers are stopped and started.

### Requirement #2 - Setup a remote server
Setup a remote server on [Digital Ocean](https://m.do.co/c/b29aa8845df8), AWS or any other cloud provider. You should use terraform to create the server and Ansible to configure it properly i.e. setup docker, docker-compose, pulling the image from Docker Hub and running the containers.

### Requirement #3 - Setup a CI/CD pipeline
Once you have everything working locally, push your code to GitHub and setup a CI/CD pipeline to deploy the application to the remote server. You can use [GitHub Actions](https://github.com/features/actions) to setup the pipeline. Make sure to use docker-compose to run the application in the production environment.

### Bonus - Setup a reverse proxy
Setup a reverse proxy using Nginx to allow you to access the application via http://your_domain.com. You should use docker-compose to setup the reverse proxy.

After completing this project, you will have a good understanding of Docker Compose, multi-container applications, CI/CD pipelines, and more.