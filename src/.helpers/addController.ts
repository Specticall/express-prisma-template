import fs from "fs/promises";
import path from "path";
import { logger } from "./logger";

const template = `import { RequestHandler } from "express";

const {{CONTROLLER_FUNCTION}}: RequestHandler = async (request, response, next) => {
  try {
    // Your logic here
  } catch (error) {
    next(error);
  }
};

export default { {{CONTROLLER_FUNCTION}} }
`;

async function main() {
  try {
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

    logger.success(`Successfuly Created ${controllerFileName}`);
  } catch {
    logger.error("Unable To Create Controller");
  }
}

main();
