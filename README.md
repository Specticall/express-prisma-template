# Express Prisma Template Guide

Welcome to the Express Prisma Template documentation! This comprehensive guide is designed to help you navigate and utilize the template effectively, ensuring you can get your project up and running smoothly.

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

### Routes Directory

* `index.ts`: Connects partial routers into a single instance for the main application middleware. Refer to [Creating Routes section](#creating-routes).

### Utils Directory

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

```bash
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

```bash
> npm run insert:controller <controller-name> <controller-function-name>
```

For example, to add a `createUser` function to the `userController` file, we can run the command `npm run create:controller user createUser`

### Creating Routes

Creating routes involves two main steps:
1. **Defining the Router**: Create a new router file in the `routes/` directory.
2. **Inserting the Router**: Add the new router to `routes/index.ts` to integrate it with the main application.

You can automate these steps using the provided script:

```bash
> npm run create:router <name> <path-name?>
```

#### Example

Running the command `npm run create:router user` will:
1. Create a new file `userRouter.ts` in the `routes/` directory.
2. Add an import and use statement in `routes/index.ts` to connect the new router with a pluralized route name.

The `routes/index.ts` file will look like this:

```ts
import { userRouter } from "./userRouter";
import { Router } from "express";

const router = Router();

router.use("/users", userRouter);

export default router;
```

If you want to override the default pluralization, you can specify a custom path name. For example, running `npm run create:router user person` will result in:

```ts
router.use("/person", userRouter);
```

#### Defining Sub-Routes and Controllers

In the newly created `userRouter.ts` file, you can define sub-routes and link them to their respective controller functions. You can also add any necessary middleware using the `.use` method.

Here is an example of what `userRouter.ts` might look like:

```ts
import { UserController } from "../controllers";
import { Router } from "express";
import protect from "../middlewares/protect";

const userRouter = Router();

// Middleware for token validation
userRouter.use(protect);

// Define routes and link to controller functions
userRouter.get("/", UserController.getUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.post("/", UserController.createUser);

export default userRouter;
```

#### Accessing the Routes

Once the routes are defined and connected, you can access them using the base URL followed by the route and sub-route. For example, to access the `getUserById` function, you would use:

```
http://localhost:8000/users/1
```

This URL structure ensures that your API endpoints are organized and easily accessible.

### Creating Models

To create models, add a new `.prisma` file to the `models/` directory. Prisma's [multi-file support](https://www.prisma.io/docs/orm/prisma-schema/overview/location#multi-file-prisma-schema) allows splitting models into separate files. The `main.prisma` file holds the global prisma configuration such as database types providers.

Run migrations (for SQL Databases) with:

```bash
> npx prisma migrate dev --name <migration-name>
```

Refer to the [Prisma ORM Documentation](https://www.prisma.io/docs/orm) for more details.

> In a traditional Prisma project, the `models/` folder is typically named `prisma/` and resides outside the `src` directory. However, to align with the MVC (Model-View-Controller) naming conventions, we have renamed it to `models/` and moved it insde the `src/` directory for a more consistent and intuitive experience.

### Using Seeders
### Error Handling
### Inserting Enviroment Variables