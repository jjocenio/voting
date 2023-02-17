'use strict';

const puppeteer = require('puppeteer');

(async () => {
    const STATE_SELECTOR = '#post-1200 > div > div.wp-block-columns.is-layout-flex.wp-container-12 > div:nth-child(1) > figure > a';
    const VOTE_SELECTOR = '#PDI_answer51566433';
    const BUTTON = '#pd-vote-button11306089';
    const RETURN_LINK = 'a.pds-return-poll';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 1040, height: 980, deviceScaleFactor: 1});
    await page.goto('http://notavelusa.com/');
    console.log('Opened');
    await page.screenshot({path: './home.png'});        

    await page.waitForSelector(STATE_SELECTOR);
    await page.click(STATE_SELECTOR);

    await page.waitForSelector(VOTE_SELECTOR);
    await page.click(VOTE_SELECTOR);
    console.log('Voting');  

    await page.waitForSelector(BUTTON);
    await page.click(BUTTON);

    try {
        await page.waitForSelector(RETURN_LINK);
        console.log('Voted');
    } catch (error) {
        console.log('Voted not counted');
    }

    await page.screenshot({path: './lastvote.png'});        
    await browser.close();
})();
