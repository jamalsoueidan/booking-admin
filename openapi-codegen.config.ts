import { defineConfig } from "@openapi-codegen/cli";
import {
  generateReactQueryComponents,
  generateSchemaTypes,
} from "@openapi-codegen/typescript";
export default defineConfig({
  bookingApi: {
    from: {
      relativePath: "./openapi.yaml",
      source: "file",
    },
    outputDir: "./src/api",
    to: async (context) => {
      const filenamePrefix = "bookingApi";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
