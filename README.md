# Google Maps store searcher

## Description

NestJS REST API with google maps API integration for autocomplete addresses and search near stores

## Features

- [x] Database ([typeorm](https://www.npmjs.com/package/typeorm) Postgres).
- [x] Migrations.
- [x] Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Caching.
- [x] Login.
- [x] Users and Roles.
- [x] Swagger.
- [x] E2E and units tests.
- [x] Docker.
- [x] CI (Github Actions).

## Start development in localhost

```bash
git clone --depth 1 https://github.com/GMezaPostigo/nestjs-google-maps-stores-searcher.git nest-app
cd nest-app
cp env-example .env
```

Generate your google maps api key

Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

Change `GOOGLE_API_KEY=` to `GOOGLE_API_KEY={YOUR_GOOGLE_API_KEY}`

Run DB container:

```bash
docker-compose up -d postgres
```

Start project:

```bash
npm install

npm run migration:run

npm run seed:run

npm run start:dev
```

## Swagger

- http://localhost:3000/docs

## Database utils

Generate migration

```bash
npm run migration:generate -- src/database/migrations/MigrationName 
```

Run migration

```bash
npm run migration:run
```

Revert migration

```bash
npm run migration:revert
```

Drop all tables in database

```bash
npm run schema:drop
```

Run seed

```bash
npm run seed:run
```

## Tests
`For testing google maps APIS add a google a API Key value to GOOGLE_API_KEY in env-example/.env file and replace maps.e2e-spec.ts.addKey name to maps.e2e-spec.ts`
```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Tests in Docker

```bash
docker-compose -f docker-compose.ci.yaml --env-file env-example -p ci up --build --exit-code-from api && docker-compose -p ci rm -svf
```
