const OpenAI = require('openai');
const dotenv = require('dotenv');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const submitResume = async (req, res) => {
  try {
    const bodyContent = JSON.stringify(req.body, null, 2);
    console.log('body content', bodyContent);
    const completion = await openai.chat.completions.create({
      messages: [{
        role: 'system',
        content: 'You are an expert in creating professional resumes in HTML format.',
      },
      {
        role: 'user',
        content: `Given the following JSON object, generate a traditional one-page HTML resume. Format the description fields of the work experience into correct bullet points, ensure the summary is professional and grammatically correct, and the entire resume fits on one page. The name should be centered on the page and the email, location, and LinkedIn should be on one line, centered with an <hr> beneath it. Each main section should be separated by an <hr>. Each line in the skills section should be no more than 95 characters. The LinkedIn should be a link to the URL provided. Do not include \`\`\`html or \`\`\` at the beginning or end of the response. Ensure the response is clean HTML. Do not set a max width for the body element. There should be a .5inch margin around the resume, put this css in a div containing the entire resume, not the body. The job company should be 14px, and the date should be on the same line as the company, justified to the right. The role should be directly under the company. The education section should be formatted the same way with the School, field of study, start and end date on the same line with the date justified to the right of the page.  All dates should be in month year format e.g. December, 2023.  The font for the text on the page should be 12px, unless it is a section title.
    \n### ${bodyContent} ###`,
      }],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
    });
    console.log(completion.choices[0].message);
    res.send(completion.choices[0].message);
  } catch (error) {
    console.error('Error analyzing text:', error);
    res.status(500).send('Error analyzing text');
  }
};

module.exports = {
  submitResume,
};
