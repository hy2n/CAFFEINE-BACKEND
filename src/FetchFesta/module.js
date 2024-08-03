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

export { fetchFesta };