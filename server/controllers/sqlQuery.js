const OpenAI = require('openai');
const dotenv = require('dotenv');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sqlQuery = async (req, res) => {
  console.log('SQL Query Generating:', req.body);
  try {
    const completion = await openai.chat.completions.create({
      messages: [{
        role: 'system',
        content: 'You are an expert an expert data analyst with vast experience creating SQL Queries.',
      },
      {
        role: 'user',
        content: `Using these data tables where the data table name is tableName and the schema is tableSchema ${JSON.stringify(req.body.tables)}, generate a SQL Query based on this description: ${req.body.query.queryDescription}. Return the actual SQL Query statement only, in this HTML Format so it can be easily displayed <div>Your Generated SQL Query is:<br/><b>SQL Query Goes here</b><div> with the : followed by the actual query inside the <b> tags. Do not include \`\`\`html or \`\`\` at the beginning or end of the response. Ensure the response is clean HTML. Do not set a max width for the body element.`,
      }],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 3000,
      top_p: 1,
    });
    res.send(completion.choices[0].message);
  } catch (error) {
    console.error('Error generating SQL Query', error);
    res.status(500).send('Error generating SQL Query');
  }
};

module.exports = {
  sqlQuery,
};
