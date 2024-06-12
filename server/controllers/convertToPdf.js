const puppeteer = require('puppeteer');

const convertToPDF = async (req, res) => {
  console.log('Starting to convert to PDF');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlContent = req.body.content;

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="sample.pdf"',
    'Content-Length': pdfBuffer.length,
  });

  res.send(pdfBuffer);
};

module.exports = {
  convertToPDF,
};
