const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

// Измените эту строку, чтобы обслуживать файлы из корня проекта, а не из папки 'public'
app.use(express.static('.'));

app.use(express.text({ type: 'text/html' })); 

app.post('/generate-pdf', async (req, res) => {
    const html = req.body;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, {
        waitUntil: 'networkidle0'
    });

    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true
    });

    await browser.close();

    res.contentType("application/pdf");
    res.send(pdf);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
