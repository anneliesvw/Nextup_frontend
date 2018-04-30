

const url = 'http://localhost:8081';
module.exports = {
  login(browser) {
    browser
      .url(`${url}/register`)
      .waitForElementVisible('.register-form', 20000)
      .assert.title('Dashboard | NextUp');

    browser
      .url(`${url}/register`)
      .waitForElementVisible('.el-form', 5000)
      .setValue('div#pane-login div:nth-child(1) > div > div > input', 'test@nextuptest.com')
      .setValue('div#pane-login div:nth-child(2) > div > div > input', 'adminpassword')
      .pause(3000)
      .click('div#pane-login button[type="button"]')
      .waitForElementVisible('div > div.dashboard-container', 20000);
  },
  updateProfile(browser) {
    browser
      .url(`${url}/Settings`)
      .waitForElementVisible('div > button[type="button"]:nth-child(3)', 5000)
      .click('div > button[type="button"]:nth-child(3)')
      .waitForElementVisible('form > div:nth-child(1) > div > div > input', 5000)
      // set name
      .clearValue('form > div:nth-child(1) > div > div > input')
      .setValue('form > div:nth-child(1) > div > div > input', 'Anneliesie')
      // set Location
      .clearValue('div:nth-child(4) > div > input')
      .setValue('div:nth-child(4) > div > input', ['Amsterdam', browser.Keys.ARROW_DOWN])
      .pause(2000)
      .setValue('div:nth-child(4) > div > input', [browser.Keys.ARROW_DOWN])
      .setValue('div:nth-child(4) > div > input', [browser.Keys.ENTER])
      // add preference
      .click('div:nth-child(5) > div > button[type="button"]')
      .waitForElementVisible('div.el-input.el-input--mini.el-input--suffix > input', 5000)
      .setValue('div.el-input.el-input--mini.el-input--suffix > input', 'party')
      .setValue('div.el-input.el-input--mini.el-input--suffix > input', [browser.Keys.ENTER])
      .click('span > button[type="button"].el-button.el-button--primary')
      .waitForElementVisible('div > div:nth-child(11)', 5000)
      .pause(2000)
      .assert.containsText('div > div:nth-child(11)', 'Amsterdam, Nederland');
  },
  updatePassword(browser) {
    browser
      .url(`${url}/Settings`)
      .waitForElementVisible('div > button[type="button"]:nth-child(21)', 5000)
      // get editpassword dialog
      .click('div > button[type="button"]:nth-child(21)')
      .waitForElementVisible('form > div:nth-child(1) > div > div > div > input', 5000)
      // set old password
      .setValue('form > div:nth-child(1) > div > div > div > input', 'adminpassword')
      // set new password
      .setValue('div:nth-child(2) > div > div > div > input', 'admin')
      .setValue('div:nth-child(3) > div > div > div > input', 'admin')
      .click('span > button[type="button"].el-button.el-button--primary')
      .waitForElementVisible('div > div:nth-child(20)', 5000)
      // try login new password
      .url(`${url}/register`)
      .waitForElementVisible('div#pane-login div:nth-child(1) > div > div > input', 5000)
      .clearValue('div#pane-login div:nth-child(1) > div > div > input')
      .setValue('div#pane-login div:nth-child(1) > div > div > input', 'test@nextuptest.com')
      .clearValue('div#pane-login div:nth-child(2) > div > div > input')
      .setValue('div#pane-login div:nth-child(2) > div > div > input', 'admin')
      .pause(3000)
      .click('div#pane-login button[type="button"]')
      .waitForElementVisible('div > div.dashboard-container', 5000)
      .url(`${url}/Settings`)
      .pause(2000)
      .waitForElementVisible('div > button[type="button"]:nth-child(21)', 5000)
      // get editpassword dialog
      .click('div > button[type="button"]:nth-child(21)')
      .waitForElementVisible('form > div:nth-child(1) > div > div > div > input', 5000)
      // set old password
      .setValue('form > div:nth-child(1) > div > div > div > input', 'admin')
      // set new password
      .setValue('div:nth-child(2) > div > div > div > input', 'adminpassword')
      .setValue('div:nth-child(3) > div > div > div > input', 'adminpassword')
      .click('span > button[type="button"].el-button.el-button--primary')
      .waitForElementVisible('div > div:nth-child(20)', 5000);
  },
};

