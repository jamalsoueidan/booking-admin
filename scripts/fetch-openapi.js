import axios from "axios";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const openApiYmlUrl =
  "https://raw.githubusercontent.com/jamalsoueidan/booking-shopify-api/main/docs/openapi.yaml";
const openApiYmlLocalPath = "./openapi.yaml";
const generatedClientPath = "./src/generated-client";

async function downloadOpenApiYml() {
  try {
    const response = await axios.get(openApiYmlUrl, { responseType: "text" });
    fs.writeFileSync(openApiYmlLocalPath, response.data);
    console.log("OpenAPI YAML file downloaded successfully.");
  } catch (error) {
    console.error(`Error downloading OpenAPI YAML file: ${error.message}`);
    process.exit(1);
  }
}
async function main() {
  await downloadOpenApiYml();
}

main();
