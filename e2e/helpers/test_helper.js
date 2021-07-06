const Helper = require('@codeceptjs/helper');

class Test extends Helper {
  async seeInShadow(query) {
    const page = this.helpers['Puppeteer'].page;
    return await page.waitForFunction(query);
  }

  async clickInShadow({shadowOne, shadowTwo, target}) {
    const page = this.helpers['Puppeteer'].page;
    await page.evaluate(
      ({shadowOne, shadowTwo, target}) => {
        document
          .querySelector(shadowOne)
          .shadowRoot.querySelector(shadowTwo)
          .shadowRoot.querySelector(target)
          .click();
      },
      {shadowOne, shadowTwo, target},
    );
  }

  async getTextInShadow(query) {
    const titleSelector = await this.seeInShadow(query);
    return await titleSelector.evaluate((el) => el.textContent);
  }
}

module.exports = Test;
