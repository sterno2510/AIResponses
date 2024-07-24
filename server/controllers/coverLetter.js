const OpenAI = require('openai');
const dotenv = require('dotenv');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const coverLetter = async (req, res) => {
  console.log('Cover Letter Generating');
  try {
    const completion = await openai.chat.completions.create({
      messages: [{
        role: 'system',
        content: 'You are an expert in creating professional cover letters in HTML format.',
      },
      {
        role: 'user',
        content: `Using this resume ${req.body.resume} and this job description ${req.body.jobDescription}, generate and return only a traditional one-page cove letter, not a resume. Do not include a header in the letter, start with dear..., Do not include \`\`\`html or \`\`\` at the beginning or end of the response. Ensure the response is clean HTML. Do not set a max width for the body element. There should be a .5inch margin around the resume, put this css in a div containing the entire cover letter, not the body.`,
      }],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 1,
    });
    res.send(completion.choices[0].message);
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).send('Error generating image');
  }
};

module.exports = {
  coverLetter,
};
