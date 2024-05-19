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

    ffmpeg(req.file.path)
      .audioCodec('libmp3lame')
      .audioChannels(1)
      .format('mp3')
      .save(audioFilePath)
      .on('end', async () => {
        console.log('Audio file created:', audioFilePath);

        const audioContent = fs.readFileSync(audioFilePath).toString('base64');
        console.log('Audio content read and converted to base64');
        const audio = { content: audioContent };
        const config = { encoding: 'MP3', sampleRateHertz: 44100, languageCode: 'en-US' };
        const request = { audio, config };

        console.log('Request:', request);
        const [response] = await client.recognize(request);
        console.log('Google Speech-to-Text response:', response);

        if (response && response.results && response.results.length > 0) {
          const transcription = response.results.map((result) => result.alternatives[0].transcript).join('\n');
          fs.unlinkSync(audioFilePath);
          res.json({ transcribedText: transcription });
        } else {
          res.status(500).json({ error: 'No transcription results found' });
        }
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
