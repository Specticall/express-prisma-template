# Prisma Express Template Guide

Welcome to the prisma-express-template documentation. This guide explains how to use the template effectively.

## 1. Installation

## 2. Directory Structure

The template follows the `Model-View-Controller` structure with additional extensions.

```
└── root/
  ├── models/
  │   └── seed/
  ├── controllers/
  ├── routes/
  ├── config/
  ├── utils/
  │   └── http/
  └── .helpers/
```

### Summary

| Directory     | Description |
|---------------|-------------|
| `models/`     | Contains database-related files, including `migrations/`, `seed/`, and `.prisma` schemas with [multi-file support](https://www.prisma.io/docs/orm/prisma-schema/overview/location#multi-file-prisma-schema) enabled. |
| `controllers/`| Contains business logic controllers. |
| `routes/`     | Defines API routes. `index.ts` connects the top-level router to the app. |
| `config/`     | Stores configuration settings like environment variables and constants (e.g., `prisma` instance). |
| `utils/`      | Contains reusable utility functions. |
| `utils/http/`       | Manages HTTP requests/responses. |
| `models/seed/` | Contains seeder functions |
| `.helpers/`   | **[DO NOT TOUCH]** Contains code for utility scripts. |

### Src Directory

* `app.ts`: Main entry point, defines routes, error handling, CORS, and request body parser.
* `index.ts`: Starts the server and loads environment variables.

### Controllers Directory

* `ErrorController`: Handles error display based on environment (production/development).
* `index.ts`: Aggregates controller exports for concise imports. To create controllers, refer to the [Creating Controllers section](#creating-controllers)

### Config Directory

* `config.ts`: Contains configuration files and constants, including the `prisma` instance.
* `env.ts`: Converts environment variables to regular variables for easier use.

### Models Directory

* `main.prisma`: Main Prisma configuration, including `client` and `db`. Create models by adding `.prisma` files.
* `seed`: Contains files for seeding the database. Use `npm run seed <name>` to run seeders. Refer to [Using Seeders section](#using-seeders).

### Routes

* `index.ts`: Connects partial routers into a single instance for the main application middleware. Refer to [Creating Routes section](#creating-routes).

### Utils

* `http`: Contains the [AppError](#error-handling) class for handling operational errors and the `statusCode` object for common HTTP status codes.

## 3. Usage Guides

### Scripts
This template includes utility scripts to speed up development by generating boilerplate code. The scripts are listed in `package.json` and implemented in the `.helpers/` directory. Below is a summary of the scripts and their usage:

| Script | Usage |
|--------|-------|
| `npm run dev` | Starts the server in development mode |
| `npm run prod` | Starts the server in production mode |
| `npm run build` | Bundles the typescript files into minified and distributable javascript files |
| `npm run seed <name?>` | Runs seeder scripts in `/models/seed`. `<name>` is optional and specifies the seeder file to run; defaults to `index` if not provided. |
| `npm run create:seeder <name>` | Creates a seeder file on `models/seed` named `<named>` |
| `npm run create:router <name> <path-name?>` | Creates a router file named `<name>` on `routes/` and connects it via `index.ts`. Optional `<path-name>` sets the router's URL path; defaults to pluralized `<name>`. |
| `npm run create:controller <name>` | Creates a controller file inside `controllers/` |
| `npm run insert:controller <controller-name> <controller-function-name>` | Inserts a controller function named `<controller-function-name>` into an existing `<controller-name>` file |
| `npm run insert:env <key> <value>` | Populates the `.env` and `config/env.ts` with `<key>=<value>` pairs |

### Starting the Server

To start the server in development mode you can use the command below
```bash
> npm run dev
```

To use development mode, you can instead run the following command
```bash
> npm run prod
```

### Creating Controllers

Creating controllers can be done manually or using the script command:

```
> npm run create:controller <name>
```

For example, `npm run create:controller user` will:
1. Insert an export line into `controllers/index.ts`.
2. Create a `userController.ts` file in the `controllers/` directory with a default `getUser` method.

```ts
import { RequestHandler } from "express";

const getUser: RequestHandler = async (request, response, next) => {
  try {
    // Your logic here
  } catch (error) {
    next(error);
  }
};

export default { getUser };
```

To add more controller functions, you can do it manually or use:

```
> npm run insert:controller <controller-name> <controller-function-name>
```

For example, to add a `createUser` function to the `userController` file, we can run the command `npm run create:controller user createUser`

### Creating Routes
### Creating Models
### Using Seeders
### Error Handling
### Inserting Enviroment Variables