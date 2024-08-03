import { createRequire } from "module";
const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');

const fetchFesta = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://festa.io/search', { waitUntil: 'networkidle2' });

  const output = await page.evaluate(() => {
    let output = [];
    const cards = document.querySelectorAll('.aha817-0.gddsSO');
    cards.forEach((card) => {
      const children = [...card.children];
      const src = card.innerHTML.split('"')[3];
      const data = [...(children[1].children)];
      const dataInfo = data[0].innerText.split(' ');
      let cardData = {
        url: card.href,
        img: src,
        date: {
          month: dataInfo[0].replace('월', ''),
          day: dataInfo[1].replace('일', ''),
          week: dataInfo[2][1],
        },
        online: dataInfo[4] === '온라인',
        title: data[1].innerText,
        tag: data[2].innerText.split(' '),
      };
      output.push(cardData);
    });
    return output;
  });

  await browser.close();

  return output;
};

const fetchFestaDetail = async (eventId) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://festa.io/events/${eventId}`, { waitUntil: 'networkidle2' });

  const output = await page.evaluate(() => {
    const output = {};
    const info = [...(document.querySelector(".PrimaryEventInfo__Wrapper-sc-86u3sj-0").children)];
    const detail = [...(document.querySelector(".UserContentArea-sc-1w8buon-0").children)];
    output.title = info[0].innerHTML;
    output.where = info[1].innerHTML;
    output.place = document.querySelector(".LocationInfo__Address-sc-1lbdfrz-4").innerHTML;
    output.when = [...(info[4].children)][1].innerHTML;
    output.who = [...(info[5].children)][1].href;
    output.img = document.querySelector(".EventInfoPage__MainImage-sc-1ya0yur-2").src;
    let temp = "";
    detail.forEach((p) => {
      if (!p.innerHTML.includes("img")){
        temp += p.innerHTML + "<br>";
      }
    });
    output.detail = temp;
    output.map = document.querySelector(".LocationInfo__MapWrapper-sc-1lbdfrz-1").lastChild.src;
    output.until = document.querySelector(".tickets__IconText-sc-1d0zp6o-7").lastChild.datetime;

    return output;
  });

  await browser.close();

  return output;
}

export { fetchFesta, fetchFestaDetail };