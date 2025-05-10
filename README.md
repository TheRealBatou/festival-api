# Festival API
A RESTful API for managin festivals, built with Node.js, Typescript, Express, TypeORM and PostgreSQL

## Features
- CRUD operations for festivals
- Pagination and filtering for the festival list endpoint
- Swagger UI documentation
- Dockerized setup for easy deployment

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js (only if not using Docker)

### Clone The Repository

```bash
git clone https://github.com/TheRealBatou/festival-api.git
cd festival-api
```

### Run With Docker

```bash
docker-compose up --build
```
## Environment Variables

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

### Tests

## Running Tests

Tests are written with Jest + Supertest

Testing inside Docker:

```bash
docker compose exec app npm test
```
### API Documentation

## Swagger UI Documentation

Swagger UI is available at:
http://localhost:3000/api-docs


