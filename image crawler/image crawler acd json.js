const puppeteer = require("puppeteer");
const fs = require("fs");
const axios = require("axios");

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
async function downloadImage() {
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

  let pages = await browser.pages();
  let page = pages[0];
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
  );

  fs.readFile("./../src/json/official.json", "utf8", async (err, data) => {
    // 訪問每一個data
    let json = JSON.parse(data);
    for (const element of json) {
      // if (
      //   element["approach"].includes("标准寻访") ||
      //   element["approach"].includes("限定寻访")
      // ) {
      //   await downloadSingleImage(element);
      //   console.log(element["cn"] + " done");
      //   await delay(1000);
      // }

      let dir = `./image/${element["cn"]}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      await downloadSingleImage(element);
      console.log(element["cn"] + " done");
      await delay(1000);
    }
  });

  await browser.close();
}

async function downloadSingleImage(element) {
  const imageUrl = "https:" + element["half"];
  //   console.log(imageUrl);
  const response = await axios({
    method: "GET",
    url: imageUrl,
    responseType: "stream",
  });
  await response.data.pipe(
    fs.createWriteStream(`./image/${element["cn"]}/${element["cn"]}-half.png`)
  );
}

(async () => {
  await downloadImage();
})();
