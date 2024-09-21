# Backboil - Backend Boilerplate

`Backboil` is a command-line tool designed to quickly scaffold a boilerplate Node.js Express application with MongoDB integration. It provides a structured project setup with essential configurations to help you start your backend development swiftly.

## Features

- Generates a basic Node.js Express application with a structured folder layout.
- Includes boilerplate files for routes, controllers, models, middleware, and utilities.
- Automatically installs necessary dependencies (`express`, `mongoose`, `dotenv`, `nodemon`).

## Installation

To create a new Express application using `backboil`, run:

```bash
npx backboil <project-name> 
```
Replace `<project-name>` with the desired name for your project. If no project name is provided, it defaults to my-express-app.

## Project Structure
```
<project-name>
  ├── /controllers       # Controllers for handling request logic
  ├── /middleware        # Middleware for request processing
  ├── /models            # Mongoose models for MongoDB
  ├── /routes            # Route definitions
  ├── /utils             # Utility functions and helpers
  ├── /index.js          # Main entry point of the application
  ├── /package.json      # Project metadata and dependencies
  ├── /.gitignore        # Git ignore file
  ├── /.env              # Environment variables configuration
  ├── /.env.example      # Example environment variables
  └── /README.md         # Project documentation
```

## Dependencies
The following dependencies are included:

`express`: Web framework for Node.js\
\
`mongoose`: MongoDB object modeling tool\
\
`dotenv`: Loads environment variables from a .env file\
\
`nodemon`: Tool for automatically restarting the application during development