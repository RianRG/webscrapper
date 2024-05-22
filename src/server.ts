import puppeteer from "puppeteer";
const url = process.env.URL || '';
const main = async () =>{
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.goto(url);

  await page.screenshot({ path: 'test.png' })
  console.log('passed')

  const items = await page.evaluate(() =>{

    const items = Array.from(document.querySelectorAll('.compra .texto h3'))
    return items.map(item =>{
      return {
        title: item.textContent,

      }
    })
  })
  await browser.close();
  console.log(items);
}


main();