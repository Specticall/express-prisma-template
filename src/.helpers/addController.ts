import fs from "fs/promises";
import path from "path";
import { logger } from "./logger";

const template = `import { RequestHandler } from "express";

export const {{CONTROLLER_FUNCTION}}: RequestHandler = async (request, response, next) => {
  try {
    // Your logic here
  } catch (error) {
    next(error);
  }
};

`;

async function main() {
  const rawNameInput = process.argv[2];
  const controllerName = `${rawNameInput[0].toUpperCase()}${rawNameInput.slice(
    1
  )}`;
  const controllerVariable = `get${controllerName}`;
  const controllerFileName = `${controllerName}Controller.ts`;

  const cwd = process.cwd();
  const controllerPath = path.resolve(
    cwd,
    `./src/controllers/${controllerFileName}`
  );

  await fs.writeFile(
    controllerPath,
    template.replace(/{{CONTROLLER_FUNCTION}}/g, `${controllerVariable}`)
  );

  const controllerIndexPath = path.resolve(cwd, `./src/controllers/index.ts`);
  const controllerIndexFile = await fs.readFile(controllerIndexPath, "utf-8");
  await fs.writeFile(
    controllerIndexPath,
    `${controllerIndexFile}export * from "./${controllerFileName.replace(
      ".ts",
      ""
    )}";\n`
  );

  logger.success("Successfuly created controller");
}

main();
