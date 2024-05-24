import puppeteer from "puppeteer";
const url = process.env.URL || '';
import fs from 'fs';

const main = async () =>{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  await page.screenshot({ path: 'test.png' })

  const items = await page.evaluate(() =>{

    const items = Array.from(document.querySelectorAll('.compra'))
    return items.map((item: any) =>({
      title:  item.querySelector('.texto h3')?.textContent,
      details: item.querySelector('.texto p')?.textContent.replaceAll('\n', '').replaceAll('        ', '')
    }))
  })
  await browser.close();
  fs.writeFile('products.json', JSON.stringify(items, null, 2), err =>{
    if(err) throw new Error('An error occurred!')
  })
  console.log(items);
}


main();