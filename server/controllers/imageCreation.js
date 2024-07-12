const OpenAI = require('openai');
const dotenv = require('dotenv');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const imageCreation = async (req, res) => {
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
        content: '',
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
  imageCreation,
};
