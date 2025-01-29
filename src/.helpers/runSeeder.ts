import { logger } from "./logger";
import { execa } from "execa";
async function main() {
  try {
    const seederName = process.argv[2];
    await execa(
      "npx",
      ["tsx", `./src/models/seed/${seederName || "index"}.ts`],
      {
        stdio: "inherit",
      }
    );
    logger.success("Successfuly Ran Seeder");
  } catch (err) {
    logger.info((err as Error).message);
    logger.error("Something went wrong while trying to run the seeder");
  }
}

main();
