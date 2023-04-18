import { defineConfig } from "orval";

export default defineConfig({
  BookingApi: {
    output: {
      mode: "split",
      schemas: "src/api/model",
      client: "react-query",
      target: "src/api/",
      mock: false,
      override: {
        query: {
          useQuery: false,
          useInfinite: false,
        },
      },
    },
    input: {
      target: "./openapi.yaml",
    },
    hooks: {
      afterAllFilesWrite: "  --write",
    },
  },
});
