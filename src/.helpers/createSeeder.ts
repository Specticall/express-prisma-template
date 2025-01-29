import path from "path";
import { logger } from "./logger";
import fs from "fs/promises";

const template = `export async function seed() {
  /**
   * Your seeding logic here
   */
}

seed();
`;

async function main() {
  try {
    const seederName = process.argv[2];

    const seederPath = path.resolve(
      process.cwd(),
      `./src/models/seed/${seederName}.ts`
    );
    await fs.writeFile(seederPath, template);
    logger.success("Succesfuly Created Seeder");
  } catch {
    logger.error("Failed to Create Seeder");
  }
}

main();
