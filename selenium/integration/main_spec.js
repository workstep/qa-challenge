const { Builder } = require("selenium-webdriver")
require("chromedriver")

async function testExample(driver) {
  // Your test goes here...
}

async function runSpecs() {
  let driver = await new Builder().forBrowser("chrome").build()

  // List your test functions here:
  testExample(driver)

  await driver.quit()
}

runSpecs()
