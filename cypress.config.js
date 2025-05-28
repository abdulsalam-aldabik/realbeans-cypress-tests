const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  e2e: {
    projectId: "9aqqrn",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
