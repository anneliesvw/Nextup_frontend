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
    let success = false;
    browser
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div', 5000)
      .click('div.site-content > div > div > div > div > div')
      .waitForElementVisible('div > div.el-dialog__body', 5000)
      .setValue('div:nth-child(1) > div > div > input', 'group')
      .setValue('div > textarea', 'description')
      .click('span > button[type="button"].el-button.el-button--primary')
      .waitForElementVisible('div.site-content > div > div > div > div:nth-child(2)', 5000)
      .pause(3000)
      .perform(done => {
        browser.elements('css selector', '.group-name', elements => {
          const promises = [];
          elements.value.forEach(e => {
            const p = new Promise(resolve => {
              browser.elementIdText(e.ELEMENT, result => {
                if (result.value === 'GROUP') {
                  success = true;
                }
                resolve();
              });
            });
            promises.push(p);
          });
          Promise.all(promises).then(() => {
            browser.assert.ok(success);
            done();
          });
        });
      });
  },
  updateGroup(browser) {
    let child = 2;
    let success = false;
    let tel = 2;
    browser
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div', 5000)
      .pause(2000)
      .perform(done => {
        browser.elements('css selector', '.group-name', elements => {
          const promises = [];
          elements.value.forEach(e => {
            const p = new Promise(resolve => {
              browser.elementIdText(e.ELEMENT, result => {
                if (result.value === 'GROUP') {
                  child = tel;
                }
                tel += 1;
                resolve();
              });
            });
            promises.push(p);
          });
          Promise.all(promises).then(() => {
            console.log(child);
            browser.click(`div.site-content > div > div > div > div:nth-child(${child})`);
            done();
          });
        });
      })
      // .click('div.site-content > div > div > div > div:last-child')
      .waitForElementVisible('div.site-content > div.group-detail-container', 5000)
      .click('div.banner-buttons > button[type="button"].el-button.admin-edit.el-button--info')
      .waitForElementVisible('div.banner-buttons > button[type="button"].el-button.el-button--danger', 5000)
      .clearValue('div.banner-title > input')
      .setValue('div.banner-title > input', 'groupie')
      .click('div.banner-buttons > button[type="button"].el-button.el-button--success')
      .waitForElementVisible('div.banner-buttons > button[type="button"].el-button.admin-edit.el-button--info', 5000)
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div > div > div:nth-child(2)', 5000)
      .pause(2000)
      .perform(done => {
        browser.elements('css selector', '.group-name', elements => {
          const promises = [];
          elements.value.forEach(e => {
            const p = new Promise(resolve => {
              browser.elementIdText(e.ELEMENT, result => {
                if (result.value === 'GROUPIE') {
                  success = true;
                }
                resolve();
              });
            });
            promises.push(p);
          });
          Promise.all(promises).then(() => {
            browser.assert.ok(success);
            done();
          });
        });
      });
  },
  createEvent(browser) {
    let child = 2;
    let tel = 2;
    browser
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div', 5000)
      // click group
      .pause(2000)
      .perform(done => {
        browser.elements('css selector', '.group-name', elements => {
          const promises = [];
          elements.value.forEach(e => {
            const p = new Promise(resolve => {
              browser.elementIdText(e.ELEMENT, result => {
                if (result.value === 'GROUPIE') {
                  console.log('click');
                  child = tel;
                }
                tel += 1;
                resolve();
              });
            });
            promises.push(p);
          });
          Promise.all(promises).then(() => {
            console.log(child);
            browser.click(`div.site-content > div > div > div > div:nth-child(${child})`);
            done();
          });
        });
      })
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
      .pause(1000)
      .click('span > button[type="button"].el-button.el-button--primary')
      .waitForElementVisible('div:nth-child(2) > div > div.activity-bottom > div.activity-details > div.activity-owner', 5000)
      .assert.containsText('div:nth-child(2) > div > div.activity-bottom > div.activity-details > div.activity-owner', 'event');
  },
  updateEvent(browser) {
    let child = 2;
    let tel = 2;
    browser
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div', 5000)
      .pause(2000)
      .perform(done => {
        browser.elements('css selector', '.group-name', elements => {
          const promises = [];
          elements.value.forEach(e => {
            const p = new Promise(resolve => {
              browser.elementIdText(e.ELEMENT, result => {
                if (result.value === 'GROUPIE') {
                  console.log('click');
                  child = tel;
                }
                tel += 1;
                resolve();
              });
            });
            promises.push(p);
          });
          Promise.all(promises).then(() => {
            console.log(child);
            browser.click(`div.site-content > div > div > div > div:nth-child(${child})`);
            done();
          });
        });
      })
      .click('div.panel-body > div.activity-wrapper')
      .waitForElementVisible('div:nth-child(2) > button[type="button"].el-button.admin-edit.el-button--info', 5000)
      .click('div:nth-child(2) > button[type="button"].el-button.admin-edit.el-button--info')
      .waitForElementVisible('div > textarea', 5000)
      .clearValue('div > textarea')
      .setValue('div > textarea', 'new description')
      .click('span > button[type="button"].el-button.el-button--primary')
      .pause(2000)
      .assert.containsText('div > div.event-description.event-generic', 'new description');
  },
  deleteEvent(browser) {
    let child = 2;
    let tel = 2;
    browser
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div', 5000)
      .pause(2000)
      .perform(done => {
        browser.elements('css selector', '.group-name', elements => {
          const promises = [];
          elements.value.forEach(e => {
            const p = new Promise(resolve => {
              browser.elementIdText(e.ELEMENT, result => {
                if (result.value === 'GROUPIE') {
                  console.log('click');
                  child = tel;
                }
                tel += 1;
                resolve();
              });
            });
            promises.push(p);
          });
          Promise.all(promises).then(() => {
            console.log(child);
            browser.click(`div.site-content > div > div > div > div:nth-child(${child})`);
            done();
          });
        });
      })
      .waitForElementVisible('div.site-content > div', 5000)
      .click('div.panel-body > div:nth-child(2) > div')
      .waitForElementVisible('div:nth-child(2) > button[type="button"].el-button.admin-edit.el-button--danger', 5000)
      .click('div:nth-child(2) > button[type="button"].el-button.admin-edit.el-button--danger')
      .waitForElementVisible('div.el-message-box__btns > button[type="button"].el-button.el-button--default.el-button--small.el-button--primary', 5000)
      .click('div.el-message-box__btns > button[type="button"].el-button.el-button--default.el-button--small.el-button--primary');
  },
  addPoll(browser) {
    let child = 2;
    let tel = 2;
    browser
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div', 5000)
      .pause(2000)
      .perform(done => {
        browser.elements('css selector', '.group-name', elements => {
          const promises = [];
          elements.value.forEach(e => {
            const p = new Promise(resolve => {
              browser.elementIdText(e.ELEMENT, result => {
                if (result.value === 'GROUPIE') {
                  console.log('click');
                  child = tel;
                }
                tel += 1;
                resolve();
              });
            });
            promises.push(p);
          });
          Promise.all(promises).then(() => {
            console.log(child);
            browser.click(`div.site-content > div > div > div > div:nth-child(${child})`);
            done();
          });
        });
      })
      .waitForElementVisible('div:nth-child(2) > div > div.panel-body > div.group-wrapper', 5000)
      .click('div:nth-child(2) > div > div.panel-body > div.group-wrapper')
      .waitForElementVisible('div > div.el-dialog__body', 5000)
      .setValue('form > div > div:nth-child(1) > div > div > input', 'title')
      .setValue('form > div > div:nth-child(2) > div > div > div > input', 'option')
      .click('form > div > button[type="button"]')
      .waitForElementVisible('div:nth-child(2) > div > div.panel-body > div.activity-wrapper', 5000);
  },
  updatePoll(browser) {
    let child = 2;
    let tel = 2;
    browser
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div', 5000)
      .pause(2000)
      .perform(done => {
        browser.elements('css selector', '.group-name', elements => {
          const promises = [];
          elements.value.forEach(e => {
            const p = new Promise(resolve => {
              browser.elementIdText(e.ELEMENT, result => {
                if (result.value === 'GROUPIE') {
                  console.log('click');
                  child = tel;
                }
                tel += 1;
                resolve();
              });
            });
            promises.push(p);
          });
          Promise.all(promises).then(() => {
            console.log(child);
            browser.click(`div.site-content > div > div > div > div:nth-child(${child})`);
            done();
          });
        });
      })
      .waitForElementVisible('div:nth-child(2) > div > div.panel-body > div.group-wrapper', 5000)
      .click('div:nth-child(2) > div > div.panel-body > div.activity-wrapper > div > div.activity-bottom > div')
      .waitForElementVisible('div > div.el-dialog__body', 5000)
      .clearValue('form > div:nth-child(1) > div > div > input')
      .setValue('form > div:nth-child(1) > div > div > input', 'title2')
      .click('form > button[type="button"]')
      .pause(1000)
      .waitForElementVisible('div.poll-graphic > div.poll-title', 5000)
      .assert.containsText('div.poll-graphic > div.poll-title', 'title2');
  },
  deletePoll(browser) {
    let child = 2;
    let tel = 2;
    browser
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div', 5000)
      .pause(2000)
      .perform(done => {
        browser.elements('css selector', '.group-name', elements => {
          const promises = [];
          elements.value.forEach(e => {
            const p = new Promise(resolve => {
              browser.elementIdText(e.ELEMENT, result => {
                if (result.value === 'GROUPIE') {
                  console.log('click');
                  child = tel;
                }
                tel += 1;
                resolve();
              });
            });
            promises.push(p);
          });
          Promise.all(promises).then(() => {
            console.log(child);
            browser.click(`div.site-content > div > div > div > div:nth-child(${child})`);
            done();
          });
        });
      })
      .waitForElementVisible('div:nth-child(2) > div > div.panel-body > div.group-wrapper', 5000)
      .click('div:nth-child(2) > div > div.panel-body > div.activity-wrapper > div > div.activity-bottom > div')
      .waitForElementVisible('div.el-dialog__body > div > button[type="button"]', 5000)
      .click('div.el-dialog__body > div > button[type="button"]');
  },
  deleteGroup(browser) {
    let child = 2;
    let tel = 2;
    browser
      .url(`${url}/MyGroups`)
      .waitForElementVisible('div.site-content > div > div', 5000)
      .pause(2000)
      .perform(done => {
        browser.elements('css selector', '.group-name', elements => {
          const promises = [];
          elements.value.forEach(e => {
            const p = new Promise(resolve => {
              browser.elementIdText(e.ELEMENT, result => {
                if (result.value === 'GROUPIE') {
                  console.log('click');
                  child = tel;
                }
                tel += 1;
                resolve();
              });
            });
            promises.push(p);
          });
          Promise.all(promises).then(() => {
            console.log(child);
            browser.click(`div.site-content > div > div > div > div:nth-child(${child})`);
            done();
          });
        });
      })
      .waitForElementVisible('div.site-content > div', 5000)
      .click('div.banner-buttons > button[type="button"].el-button.admin-edit.el-button--info')
      .waitForElementVisible('div.banner-buttons > button[type="button"].el-button.el-button--danger', 5000)
      .click('div.banner-buttons > button[type="button"].el-button.el-button--danger')
      .waitForElementVisible('div.site-content > div > div', 5000);
  },
};
