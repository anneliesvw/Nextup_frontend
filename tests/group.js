const url = 'http://localhost:8081';
module.exports = {
  login(browser) {
    browser
      .url(`${url}/register`)
      .waitForElementVisible('.register-form', 20000)
      .assert.title('Dashboard | NextUp');

    browser
      .url(`${url}/register`)
      .waitForElementVisible('div#pane-login button[type="button"]', 5000)
      .setValue('div#pane-login div:nth-child(1) > div > div > input', 'anneliesvanwallendael@hotmail.com')
      .setValue('div#pane-login div:nth-child(2) > div > div > input', 'adminpassword')
      .pause(3000)
      .click('div#pane-login button[type="button"]')
      .waitForElementVisible('div > div.dashboard-container', 20000);
  },
  createGroup(browser) {
    browser
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div', 5000)
      .click('div.site-content > div > div > div > div > div')
      .waitForElementVisible('div > div.el-dialog__body', 5000)
      .setValue('div:nth-child(1) > div > div > input', 'group')
      .setValue('div > textarea', 'description')
      .click('span > button[type="button"].el-button.el-button--primary')
      .waitForElementVisible('div.site-content > div > div > div > div:nth-child(2)', 5000)
      .pause(3000);
    // .click('div.site-content > div > div > div > div:nth-child(2)')
    // .waitForElementVisible('div > div.banner-title', 5000)
    /*
      .execute(() => {
        console.log('did it');
        const childNodes = [];
        childNodes.push(document.getElementsByClassName('content-container').childNodes);
        let success = false;
        console.log(childNodes);
        for (let i = 0; (i < childNodes.length) && (success === false); i += 1) {
          if (childNodes.value[i].ELEMENT.value === 'group') {
            success = true;
          }
        }
        browser.assert.ok(success);
      });
      */
    /*
      .elements('css selector', 'div.site-content > div > div > div', elements => {
        let success = false;
        const childNodes = [];
        childNodes.push(elements);
        console.log(childNodes.childNodes);
        for (let i = 0; (i < childNodes.length) && (success === false); i += 1) {
          console.log(childNodes[i]);
          if (childNodes[i].value.ELEMENT === 'group') {
            success = true;
          }
        }
        browser.assert.ok(success);
      });
      */
    /*
      .elements('css selector', 'div.site-content > div > div > div.content-container',
      elements => {
        let success = false;
        console.log(elements.value.length);
        for (let i = 0; (i < elements.value.length) && (success === false); i += 1) {
          console.log(elements.value[i]);
          if (elements.value[i].ELEMENT.value === 'group') {
            success = true;
          }
        }
        browser.assert.ok(success);
      });
      */
    // browser.expect.element('div > div.banner-title').to.be.present;
    // browser.expect.element('div > div.banner-title').value.text.to.equal('group');
    // .querySelector('div > div.banner-title').innerText.text.to.equal('group');
    // .verify.textContains('div > div.banner-title'.value, 'group');
    // .expect.element('div > div.banner-title').text.to.contain('group');
    // .assert.containsText('div.group-details > div', 'GROUP');
  },
  updateGroup(browser) {
    browser
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div', 5000)
      .click('div.site-content > div > div > div > div:last-child')
      .waitForElementVisible('div.site-content > div', 5000)
      .click('div.banner-buttons > button[type="button"].el-button.admin-edit.el-button--info')
      .waitForElementVisible('div.banner-buttons > button[type="button"].el-button.el-button--danger', 5000)
      .clearValue('div.banner-title > input')
      .setValue('div.banner-title > input', 'groupie')
      .click('div.banner-buttons > button[type="button"].el-button.el-button--success')
      .waitForElementVisible('div.banner-buttons > button[type="button"].el-button.admin-edit.el-button--info', 5000)
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div > div > div:nth-child(2)', 5000)
      .assert.containsText('div.group-details > div', 'GROUPIE');
    // .assert.containsText('div > div.banner-title', 'groupie');
  },
  createEvent(browser) {
    browser
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div', 5000)
      // click group
      .click('div.site-content > div > div > div > div:last-child')
      .waitForElementVisible('div.site-content > div', 5000)
      // click create event
      .click('div:nth-child(1) > div > div.panel-body > div > div')
      .waitForElementVisible('div:nth-child(1) > div > div > input', 5000)
      // set title
      .setValue('div:nth-child(1) > div > div > input', 'event')
      // click date 1
      .click('div:nth-child(3) > div > div > input')
      .waitForElementVisible('div.el-picker-panel__body-wrapper > div', 5000)
      .setValue('span:nth-child(1) > div > input', '29/03/2018')
      .setValue('span:nth-child(2) > div.el-input.el-input--small > input', '15:04')
      .click('div.el-picker-panel__footer > button[type="button"].el-button.el-picker-panel__link-btn.el-button--default.el-button--mini.is-plain')
      .waitForElementVisible('div:nth-child(4) > div > div > input', 5000)
      // click date 2
      .click('div:nth-child(4) > div > div > input')
      .waitForElementVisible('div:nth-child(5) > div.el-picker-panel__body-wrapper > div', 5000)
      .setValue('div:nth-child(5) > div.el-picker-panel__body-wrapper > div > div.el-date-picker__time-header > span:nth-child(1) > div > input', '29/03/2018')
      .setValue('div:nth-child(5) > div.el-picker-panel__body-wrapper > div > div.el-date-picker__time-header > span:nth-child(2) > div.el-input.el-input--small > input', '15:10')
      .click('div:nth-child(5) > div.el-picker-panel__footer > button[type="button"].el-button.el-picker-panel__link-btn.el-button--default.el-button--mini.is-plain')
      .waitForElementVisible('div:nth-child(5) > div > input', 5000)
      // set location
      .setValue('div:nth-child(5) > div > input', ['Antwerpen, Belg', browser.Keys.ARROW_DOWN])
      .pause(2000)
      .setValue('div:nth-child(5) > div > input', [browser.Keys.ARROW_DOWN])
      // set description
      .setValue('div > textarea', 'description')
      .click('span > button[type="button"].el-button.el-button--primary')
      .waitForElementVisible('div:nth-child(2) > div > div.activity-bottom > div.activity-details > div.activity-owner', 5000)
      .assert.containsText('div:nth-child(2) > div > div.activity-bottom > div.activity-details > div.activity-owner', 'event');
  },
  deleteEvent(browser) {
    browser
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div', 5000)
      .click('div.site-content > div > div > div > div:last-child')
      .waitForElementVisible('div.site-content > div', 5000)
      .click('div.panel-body > div:nth-child(2) > div')
      .waitForElementVisible('div:nth-child(2) > button[type="button"].el-button.admin-edit.el-button--danger', 5000)
      .click('div:nth-child(2) > button[type="button"].el-button.admin-edit.el-button--danger')
      .waitForElementVisible('div.el-message-box__btns > button[type="button"].el-button.el-button--default.el-button--small.el-button--primary', 5000)
      .click('div.el-message-box__btns > button[type="button"].el-button.el-button--default.el-button--small.el-button--primary');
  },
  deleteGroup(browser) {
    browser
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div', 5000)
      .click('div.site-content > div > div > div > div:last-child')
      .waitForElementVisible('div.site-content > div', 5000)
      .click('div.banner-buttons > button[type="button"].el-button.admin-edit.el-button--info')
      .waitForElementVisible('div.banner-buttons > button[type="button"].el-button.el-button--danger', 5000)
      .click('div.banner-buttons > button[type="button"].el-button.el-button--danger')
      .waitForElementVisible('div.site-content > div > div', 5000);
  },
};
