import { defineConfig } from "orval";

export default defineConfig({
  BookingApi: {
    output: {
      mode: "split",
      schemas: "src/api/model",
      client: "react-query",
      target: "src/api/",
      mock: true,
    },
    input: {
      target: "./openapi.yaml",
    },
  },
});
