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
      messages: [{ role: 'user', content: `Convert this into a resume and add appropriate html tags so it is formatted correctly on a web page (keep to one page) (make sure the name is centered at the top and the email, phone number and and linkedIn url are on one line underneath with an hr tag separating from the rest of the resume): ${bodyContent}.` }],
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
