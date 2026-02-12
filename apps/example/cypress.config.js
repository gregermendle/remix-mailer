import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const configOverrides = {
        baseUrl: "http://localhost:8788",
        screenshotOnRunFailure: !process.env.CI,
      };

      on("task", {
        log: (message) => {
          console.log(message);
          return null;
        },
      });

      return { ...config, ...configOverrides };
    },
  },
});
