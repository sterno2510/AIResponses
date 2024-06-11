const puppeteer = require('puppeteer');

const convertToPDF = async (req, res) => {
  // Launch a new browser instance
  console.log('Starting to convert to PDF');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the content to your HTML
  const htmlContent = req.body.content;

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Generate the PDF
  await page.pdf({
    path: 'sample.pdf', // Path to save the PDF file
    format: 'A4', // Page size
    printBackground: true, // Print background graphics
  });

  // Close the browser instance
  await browser.close();
  res.sendStatus(200);
};

module.exports = {
  convertToPDF,
};
