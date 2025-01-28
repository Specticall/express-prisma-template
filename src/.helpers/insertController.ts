import fs from "fs/promises";
import path from "path";
import { logger } from "./logger";

const template = `export const {{CONTROLLER_NAME}}: RequestHandler = async (request, response, next) => {
  try {
    // Your logic here
  } catch (error) {
    next(error);
  }
};
`;

async function main() {
  const controllerNameInput = process.argv[2];
  const controllerName = `${controllerNameInput[0].toUpperCase()}${controllerNameInput.slice(
    1
  )}`;
  const controllerFileName = `${controllerName}Controller.ts`;

  const functionNameInput = process.argv[3];

  const cwd = process.cwd();
  const controllerPath = path.resolve(
    cwd,
    `./src/controllers/${controllerFileName}`
  );

  const controllerFile = await fs.readFile(controllerPath, "utf-8");

  await fs.writeFile(
    controllerPath,
    `${controllerFile}${template.replace(
      /{{CONTROLLER_NAME}}/g,
      `${functionNameInput}`
    )}\n`
  );

  logger.success("Successfuly inserted controller function");
}

main();
