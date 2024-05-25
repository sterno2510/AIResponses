const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));
const upload = multer({ dest: 'uploads/' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/openai', upload.single('video'), async (req, res) => {
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
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
