const puppeteer = require("puppeteer");
const fs = require("fs");
const axios = require("axios");

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      //   "--disable-gpu",
      "--start-maximized",
      //   "--window-size=1920x1080",
    ],
    defaultViewport: null,
  });

  await browser.newPage();

  let pages = await browser.pages();
  let page = pages[0];
  let page2 = pages[1];
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
  );

  await page.goto("https://prts.wiki/w/%E5%B9%B2%E5%91%98%E4%B8%80%E8%A7%88");

  try {
    // 點擊篩選器
    await page.evaluate(() => {
      document
        .querySelector(
          "#filter-wrapper > table:nth-child(1) > tbody > tr.filter-checkbox.approach.disabled > td > div.checkBoxWrapper > div:nth-child(2) > label > input"
        )
        .click();
    });
  } catch (error) {
    console.log(error);
  }

  const select = await page.$("#cur-page");
  const options = await select.$$("option");
  let characterList = [];
  let errorList = [];
  for (const option of options) {
    const value = await (await option.getProperty("value")).jsonValue();

    await select.select(value);
    // 抓取多個 class name 為 "result-row" 的元素
    const elements = await page.$$(".result-row");
    // 查看元素數量
    console.log(`元素數量：${elements.length}`);
    for (const element of elements) {
      // 移動到元素
      await page.evaluate((el) => el.scrollIntoView(), element);

      const link = await element.$("td:nth-child(2) a");
      const linkText = await page.evaluate((link) => link.innerText, link);
      console.log("Link Text:", linkText);

      let dir = `./image/${linkText}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      characterList.push(linkText);

      const href = await (await link.getProperty("href")).jsonValue();
      await page2.goto(href);

      await delay(3000);

      try {
        const elementHandle = await page2.$("#img-elite0");
        if (!elementHandle) throw new Error("no element");
        const imageUrl = await page2.evaluate((img) => img.src, elementHandle);
        const response = await axios({
          method: "GET",
          url: imageUrl,
          responseType: "stream",
        });
        await response.data.pipe(
          fs.createWriteStream(`./image/${linkText}/${linkText}-img-elite0.png`)
        );
      } catch (error) {
        console.log(error);
        if (error.message != "no element")
          errorList.push(linkText + "-img-elite0");
      }

      try {
        const elementHandle2 = await page2.$("#img-elite2");
        if (!elementHandle2) throw new Error("no element");
        const imageUrl = await page2.evaluate((img) => img.src, elementHandle2);
        const response = await axios({
          method: "GET",
          url: imageUrl,
          responseType: "stream",
        });
        await response.data.pipe(
          fs.createWriteStream(`./image/${linkText}/${linkText}-img-elite2.png`)
        );
      } catch (error) {
        console.log(error);
        if (error.message != "no element")
          errorList.push(linkText + "-img-elite2");
      }
      console.log(linkText + " done");
    }
  }

  fs.writeFileSync(`./characterList.json`, JSON.stringify(characterList));
  fs.writeFileSync(`./errorList.json`, JSON.stringify(errorList));

  // #img-elite0
  // #img-elite2

  //   await browser.close();
})();
