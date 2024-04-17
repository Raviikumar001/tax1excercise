const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://tax1excercise.vercel.app",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
