import axios from "axios";
import fs from "fs";
import yaml from "js-yaml";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const openApiYmlUrl =
  "https://raw.githubusercontent.com/jamalsoueidan/booking-api/main/docs/openapi.yaml";
const openApiYmlLocalPath = "./openapi.yaml";
const generatedClientPath = "./src/generated-client";
const newServerUrl = "/api";

async function downloadOpenApiYml() {
  try {
    const response = await axios.get(openApiYmlUrl, { responseType: "text" });

    // Parse the YAML content
    const openApiContent = yaml.load(response.data);

    // Update the server URL
    if (openApiContent.servers && openApiContent.servers.length > 0) {
      openApiContent.servers[0].url = newServerUrl;
    }

    // Convert the modified object back to YAML
    const updatedYamlContent = yaml.dump(openApiContent);

    // Save the modified YAML content to the file
    fs.writeFileSync(openApiYmlLocalPath, updatedYamlContent);
    console.log(
      "OpenAPI YAML file downloaded and server URL updated successfully."
    );
  } catch (error) {
    console.error(
      `Error downloading or updating OpenAPI YAML file: ${error.message}`
    );
    process.exit(1);
  }
}

async function main() {
  await downloadOpenApiYml();
}

main();
