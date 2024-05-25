// api.js
import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
console.log('key', OPENAI_API_KEY);

const analyzeText = async (text) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        messages: [
          {
            role: 'system',
            content: `Analyze the following text and add appropriate paragraph breaks and punctuation:\n\n${text}.  Replace new lines with <br/> and double new lines with <p></p> tags`,
          },
        ],
        n: 1,
        stop: null,
        temperature: 0.7,
        model: 'davinci-002',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error analyzing text:', error);
    throw error;
  }
};

export default analyzeText;
