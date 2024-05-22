import puppeteer from "puppeteer";
const url = process.env.URL || '';
const main = async () =>{
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.goto(url);

  await page.screenshot({ path: 'test.png' })

  await browser.close();
}


main();