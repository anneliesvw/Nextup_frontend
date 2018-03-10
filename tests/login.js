module.exports = {
  function(browser) {
    browser
      .url('http://localhost:8081/register')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.site-wrapper');
  },
};
