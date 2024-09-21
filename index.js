#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { exec as execCallback } from 'child_process';
import { promisify } from 'util';

const exec = promisify(execCallback);

// Get the project name from the command line arguments, default to 'my-express-app' if not provided
const projectName = process.argv[2] || 'my-express-app';

// Set up the target directory path
const targetDir = path.join(process.cwd(), projectName);

// Boilerplate structure definition
const boilerplateStructure = {
  '/routes': {},
  '/middlewares': {},
  '/controllers': {},
  '/models': {},
  '/utils': {},
  '/index.js': `
import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;

app.use(express.json());

app.get("/healthcheck", (req, res) => {
  res.status(200).send("Server is running 🚀");
});

mongoose
  .connect(DB_CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(\`Database connected AND Server running at http://localhost:\${PORT} 🚀\`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
`,
  '/package.json': `
{
  "name": "${projectName}",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "nodemon index.js"
  }
}
`,
  '/.gitignore': `
node_modules/
.env
`,
  '/.env': `PORT=5000
DB_CONNECTION_URL=mongodb://localhost:27017/`,
  '/.env.example': `PORT
DB_CONNECTION_URL`,
  '/README.md': `
# ${projectName}

This is a simple Node.js + Express + MongoDB boilerplate project.

## Running the Project

\`\`\`
npm start
\`\`\`

## Environment Variables

- \`PORT\`: The port the server will listen on. Default is 5000.
- \`DB_CONNECTION_URL\`: MongoDB connection URI.

## Setting Up MongoDB

Ensure that you have MongoDB installed and running. Update \`.env\` with your MongoDB connection URI.
`
};

const createBoilerplate = async () => {
  try {
    console.log(`Creating project: ${projectName}`);

    // Check if the target directory already exists
    if (fs.existsSync(targetDir)) {
      console.error(`Directory ${projectName} already exists.`);
      process.exit(1);
    }

    // Iterate through the boilerplate structure and create directories and files
    for (const [relativePath, content] of Object.entries(boilerplateStructure)) {
      const filePath = path.join(targetDir, relativePath);

      if (typeof content === 'object') {
        // Create the directory if the value is an object (for directories)
        await fs.mkdirp(filePath);
      } else {
        // Create the file with the specified content
        await fs.outputFile(filePath, content.trim());
      }
    }

    console.log('Boilerplate files created successfully.');

    // Install dependencies using npm
    console.log('Installing dependencies...');
    try {
      const { stdout, stderr } = await exec(`cd ${targetDir} && npm install express mongoose dotenv nodemon`);
      stdout && console.log(`stdout: ${stdout}`);
      stderr && console.error(`stderr: ${stderr}`);
      console.log('Dependencies installed successfully.');
    } catch (error) {
      console.error(`Error installing dependencies: ${error.message}`);
      process.exit(1);
    }

    console.log(`Project ${projectName} created successfully.`);
  } catch (error) {
    console.error('Error creating project:', error);
  }
};

// Run the boilerplate creation process
createBoilerplate();
