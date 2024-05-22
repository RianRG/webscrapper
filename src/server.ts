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

    const items = Array.from(document.querySelectorAll('.compra'))
    return items.map((item: any) =>{
      return {
        title:  item.querySelector('.texto h3')?.textContent,
        details: item.querySelector('.texto p')?.textContent.replaceAll('\n', '').replaceAll('        ', '')
      }
    })
  })
  await browser.close();
  console.log(items);
}


main();