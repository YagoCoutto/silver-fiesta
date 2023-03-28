const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('http://ns27/sati/si/Cns_Erro_Email.Asp');

    // Definir tamalho da pagina
    await page.setViewport({ width: 1080, height: 900 });

    // Pegar total TD
    let totTD = await page.evaluate(() => {
        let totalTD = document.querySelectorAll('tr').length;
        return totalTD
    })

    console.log(totTD)
    while (totTD > 10) {
        totTD--
        // Pegar o ID E-mail
        await page.waitForSelector('tbody tr');
        let GetTD = await page.evaluate(() => {
            let getID = document.querySelectorAll('td')[11].textContent;
            return getID
        })

        // Digitar o ID E-mail
        await page.type('[name="DESCRI"]', GetTD,)

        // Digitar 0 em Status E-mail
        await page.type('[name="VALUES"]', '0',)

        // Clicar em Alterar Status
        await page.click('[name="Bt_Alterar"]', { delay: 100 })

        console.log(GetTD + 'E-mail Reprocessado - 0')
    }

    // Refazer o processo
    await browser.close();
})();