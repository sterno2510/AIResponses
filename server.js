const express = require('express');
const multer = require('multer');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const speech = require('@google-cloud/speech');

const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
}));

const client = new speech.SpeechClient();

app.post('/api/upload', upload.single('video'), (req, res) => {
  try {
    const audioFilePath = `uploads/${req.file.filename}.mp3`;
    console.log('am I in upload?', audioFilePath);
    ffmpeg(req.file.path)
      .audioCodec('libmp3lame') // Using libmp3lame codec for mp3
      .audioChannels(1)
      .format('mp3')
      .save(audioFilePath)
      .on('end', async () => {
        const audioContent = fs.readFileSync(audioFilePath).toString('base64');
        const audio = { content: audioContent };
        const config = { encoding: 'MP3', languageCode: 'en-US' }; // Change encoding to MP3
        const request = { audio, config };

        const [response] = await client.recognize(request);
        const transcription = response.results.map((result) => result.alternatives[0].transcript).join('\n');

        fs.unlinkSync(audioFilePath);

        res.json({ transcribedText: transcription });
      })
      .on('error', (err) => {
        console.error('Error extracting audio:', err);
        res.status(500).json({ error: 'Error extracting audio' });
      });
  } catch (err) {
    console.error('Error processing video upload:', err);
    res.status(500).json({ error: 'Error processing video upload' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
