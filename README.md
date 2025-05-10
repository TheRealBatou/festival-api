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

The project uses a ".env" file. Example of the structure and needed variables:

You **must** configure (in project root path):

```env
BASE_URL = http://localhost
BASE_PORT = 3000
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=festival_database
```

### Run With Docker

The command starts Docker in the background for easier use of the console to start tests

```bash
docker-compose up -d --build
```

## Running Tests

Tests are written with Jest + Supertest

Testing inside Docker:

```bash
docker compose exec app npm test
```

## Swagger UI Documentation

Swagger UI is available at:
http://localhost:3000/api-docs
