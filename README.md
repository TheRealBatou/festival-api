# Festival API
A RESTful API for managing festivals, built with Node.js, Typescript, Express, TypeORM and PostgreSQL.

(This project is a showcase for demonstration purposes only. Contributions are not accepted.)

## Features
- CRUD operations for festivals
- Pagination and filtering for the festival list endpoint
- Swagger UI documentation
- Dockerized setup for easy deployment

## Getting Started

### Prerequisites
- Docker & Docker Compose

### Clone The Repository

```bash
git clone https://github.com/TheRealBatou/festival-api.git
cd festival-api
```

### Environment Variables

No .env file is required to run this project.
All necessary environment variables are already defined within the docker-compose.yml file for a seamless setup.
This means you can simply use the provided Docker configuration without any additional configuration effort.

### Run With Docker

The command starts Docker in the background (-d) for easier use of the console to start tests

```bash
docker compose up -d
```

## Development Setup

This project is fully configured to run in a Docker environment for consistency, simplicity, and ease of setup.
To keep the onboarding process smooth and predictable across systems, **Docker is the recommended and supported way to run the application.**

For this reason, instructions for running the app outside of Docker (e.g., directly on a local machine) are intentionally not included.

If you prefer to run the project locally without Docker, feel free to inspect the docker-compose.yml and .env example file to configure your own environment accordingly — but please note that this setup is not officially maintained.

## Running Tests

Tests are written with Jest + Supertest

Testing inside Docker:

```bash
docker compose exec app npm test
```

## Swagger UI Documentation

Swagger UI is available at:
http://localhost:3000/api-docs
