import { allureCypress } from "allure-cypress/reporter";

export default {
  e2e: {
    baseUrl: "https://api-vitrineead-lite.qa.dotgroup.com.br",
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      return config;
    },
  },
};