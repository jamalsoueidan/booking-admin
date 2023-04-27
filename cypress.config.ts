import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "16n3xc",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  experimentalStudio: true,
});
