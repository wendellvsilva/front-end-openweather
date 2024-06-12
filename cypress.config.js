const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'pgb7rr',
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
     
    },
  },
});
