# Backend Base

A NestJS starter template with sensible defaults, strict TypeScript, and a clean module-based structure ready to build on.

## Stack

- **Node.js** v22
- **NestJS** v11
- **TypeORM** + **PostgreSQL**
- **TypeScript** (strict mode)
- **ESLint** v9 (flat config) + **Prettier**

## Getting Started

### Prerequisites

- Node.js v22 (use [nvm](https://github.com/nvm-sh/nvm): `nvm use`)
- A running PostgreSQL instance
- Copy `.env.example` to `.env.development` and fill in your database credentials

### Install

```bash
npm install
```

### Run

```bash
npm run start:dev
```

This starts the server in watch mode with the debugger enabled on port `9229`.

### Attach Debugger (VS Code)

With the server running via `start:dev`, press **F5** to attach the VS Code debugger. Breakpoints will work across the TypeScript source.

## Environment

Environment files follow the pattern `.env.{NODE_ENV}`. The active file is determined by `NODE_ENV` at startup:

| `NODE_ENV`    | File               |
| ------------- | ------------------ |
| `development` | `.env.development` |
| `test`        | `.env.test`        |
| `staging`     | `.env.staging`     |
| `production`  | `.env`             |

Required variables:

```
DATABASE_HOST=
DATABASE_PORT=5432
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_URL=        # Optional — takes precedence over individual fields if set
```

## Project Structure

The project is module-based. Each feature lives in its own directory and is self-contained:

```
src/
  common/                         # Global NestJS primitives
    constants/
    filters/
      global-exception.filter.ts
    pipes/
      validation.pipe.ts

  config/                         # App-wide configuration
    app.config.ts
    database.config.ts
    environment.validation.ts

  {module}/                       # Feature module (e.g. users/)
    {module}.module.ts
    {module}.controller.ts
    services/
      {module}.service.ts
    repositories/
      {module}.repository.ts
    entities/
      {module}.entity.ts
    dtos/
      create-{module}.dto.ts

  app.module.ts
  main.ts

e2e-test/                         # End-to-end tests
  jest-e2e.config.ts
  {module}/
    {module}.e2e.spec.ts
  test-config/
    create-test-app.ts
    reset-db.ts
```

## Scaffolding

Use the NestJS CLI to generate modules, services, and controllers following the project structure conventions:

```bash
# Module
npx nest g module users  # Creates `users/users.module.ts`

# Service (flat = no additional nesting inside services/)
npx nest g service users/services/users --flat  # Creates `users/services/users.service.ts`

# Controller (no spec file — controllers are covered by e2e tests)
npx nest g controller users/users --flat --no-spec  # Creates `users/users.controller.ts` without .spec file
```

This produces:

```
src/
  users/
    users.module.ts
    users.controller.ts
    services/
      users.service.ts
      users.service.spec.ts
```

Remember to import the new module into `app.module.ts`.

## Testing

### Unit Tests

Unit tests are co-located with the file they test, using the `.spec.ts` suffix:

```
src/
  users/
    services/
      users.service.ts
      users.service.spec.ts   ← lives next to the service
```

Run all unit tests:

```bash
npm run test
```

### E2E Tests

E2E tests live in the `e2e-test/` directory, organised by module, using the `.e2e.spec.ts` suffix:

```
e2e-test/
  users/
    users.e2e.spec.ts
```

E2E tests spin up the full NestJS application against a dedicated PostgreSQL instance running in Docker. Use `createTestApp` from `test-config/create-test-app.ts` to bootstrap the app, and `resetDatabase` from `test-config/reset-db.ts` to wipe state between tests.

Run all e2e tests (starts Docker container automatically):

```bash
npm run test:e2e
```

Run e2e tests against an already-running container:

```bash
npm run test:e2e:raw
```

The test database credentials are configured in `.env.test` and must match the Docker Compose config in `docker/e2e-test/docker-compose.yml`.

## Global Behaviour

### Validation

All incoming request bodies are validated using `class-validator`. Unknown properties are stripped silently (`whitelist: true`). Type coercion is enabled for query params and route params.

### Exception Handling

Intentional `HttpException`s (anything explicitly thrown in your code) pass through to the client with their status and message intact. Unhandled exceptions return a generic `500` with no internal details exposed.

### Serialization

`ClassSerializerInterceptor` is enabled globally. Use `@Exclude()` and `@Expose()` decorators on entity/response classes to control what gets returned in API responses.

### API Prefix

All routes are prefixed with `/api`.

### CORS

CORS is enabled globally with default settings. Configure as needed in `main.ts`.

## Database

TypeORM is configured with `synchronize: false` and `autoLoadEntities: false`. Schema changes must be handled via migrations. This applies to all environments including local development, ensuring migrations are tested before they reach staging or production.

## npm Audit

After installation you will see a number of audit warnings. These are all transitive dependencies from `@nestjs/cli` (via `@angular-devkit`) and are dev-only — they are not present in production builds. They cannot be resolved without breaking the NestJS CLI and are tracked upstream.

## Scripts

| Script                 | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `npm run start:dev`    | Start in watch + debug mode                     |
| `npm run build`        | Compile to `dist/`                              |
| `npm run start:prod`   | Run compiled output                             |
| `npm run lint`         | Lint `src/` and `test/`                         |
| `npm run lint:fix`     | Lint and auto-fix                               |
| `npm run test`         | Run unit tests                                  |
| `npm run test:e2e`     | Run e2e tests (starts Docker container)         |
| `npm run test:e2e:raw` | Run e2e tests against already-running container |
| `npm run format`       | Format all source files with Prettier           |
