import path from "path";
import fs from "fs/promises";
import { logger } from "./logger";

const template = `import { Router } from "express";

const {{ROUTER_NAME}} = Router();

/**
 * Insert your controllers here
 * @example exampleRouter.get("/", getExample)
 */

export default {{ROUTER_NAME}};
`;

async function main() {
  const routerName = process.argv[2];
  if (!routerName) {
    console.log("Missing `routerName` argument");
    return;
  }

  const routerVariable = `${routerName}Router`;
  const cwd = process.cwd();
  const routerPath = path.resolve(cwd, `./src/routes/${routerVariable}.ts`);

  await fs.writeFile(
    routerPath,
    template.replace(/{{ROUTER_NAME}}/g, `${routerVariable}`)
  );

  logger.success("Successfuly Created Router File");
}

main();
