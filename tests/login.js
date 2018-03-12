module.exports = {
  login(browser) {
    browser
      .url('http://localhost:8081/register')
      .waitForElementVisible('.register-form', 20000);
      //.assert.title('localhost');
    // .assert.title('Dashboard | NextUp');
    browser.expect.element('body').to.be.present;

    browser
      .url('http://localhost:8081/register')
      .waitForElementVisible('.site-wrapper div', 5000)
      .assert.cssClassPresent('.app', 'register-text');

    /*
    browser.element('css selector', 'select', result => {
      if (result.value && result.value.ELEMENT) {
        console.log(result.value);
      }
    });
    // browser.expect.element('#app').to.be.present;
    /*
    browser
      .elements('css selector', 'div', (elements) => {
        elements.value.forEach(element => {
          console.log('element ' + element);
          browser.elementIdAttribute(element.ELEMENT, 'class', attribute => {
            console.log('attr' + attribute.value);
          });
        });
      });
    */
  },
};
