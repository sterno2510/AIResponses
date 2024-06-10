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
        content: `Given the following JSON object, generate a traditional one-page HTML resume. Format the description fields of the work experience into correct bullet points, ensure the summary is professional and grammatically correct, and the entire resume fits on one page. The name should be centered on the page and the email, location, and LinkedIn should be on one line with an <hr> beneath it. The LinkedIn should be a link to the URL provided. Do not include \`\`\`html or \`\`\` at the beginning or end of the response. Ensure the response is clean HTML.\n### ${bodyContent} ###`,
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
