const OpenAI = require('openai');
const dotenv = require('dotenv');
const path = require('path');

const express = require('express');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

dotenv.config();

const multer = require('multer');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000' }));

const upload = multer({ dest: 'uploads/' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/openai/resume', async (req, res) => {
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
});

app.post('/api/openai/transcribe', upload.single('video'), async (req, res) => {
  const audioFilePath = `uploads/${req.file.filename}.mp3`;

  ffmpeg(req.file.path)
    .audioCodec('libmp3lame')
    .audioChannels(1)
    .format('mp3')
    .save(audioFilePath)
    .on('end', async () => {
      console.log('Audio file created:', audioFilePath);

      try {
        const transcription = await openai.audio.transcriptions.create({
          file: fs.createReadStream(audioFilePath),
          model: 'whisper-1',
        });

        const completion = await openai.chat.completions.create({
          messages: [{ role: 'user', content: `Analyze the following text and add appropriate paragraph breaks with <br/> and punctuation: ${transcription.text}.` }],
          model: 'gpt-3.5-turbo',
          temperature: 0.7,
          max_tokens: 64,
          top_p: 1,
        });

        res.send(completion.choices[0].message);
      } catch (error) {
        console.error('Error analyzing text:', error);
        res.status(500).send('Error analyzing text');
      }
    })
    .on('error', (err, stdout, stderr) => {
      console.error('FFmpeg command error:', err);
      // Additional error handling logic if needed
      res.status(500).send('FFmpeg command error');
    });
});

// Catch-all route for React Router
app.get('*', (req, res) => {
  console.log('getting main page');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
