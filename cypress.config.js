const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "6gq7f8",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
