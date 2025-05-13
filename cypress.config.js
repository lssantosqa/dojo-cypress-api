const { allureCypress } = require('allure-cypress/reporter')
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://api-vitrineead-lite.qa.dotgroup.com.br",
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: 'allure-results',
      })      
      return config
    },     
  }
})