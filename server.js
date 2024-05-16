const express = require('express');
const multer = require('multer');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const speech = require('@google-cloud/speech');

const app = express();
const port = 3000;
const upload = multer({ dest: 'uploads/' });

const client = new speech.SpeechClient();

app.post('/api/upload', upload.single('video'), async (req, res) => {
  try {
    // Extract audio from the uploaded video using FFmpeg
    const audioFilePath = `uploads/${req.file.filename}.wav`;
    ffmpeg(req.file.path)
      .audioCodec('pcm_s16le')
      .audioChannels(1)
      .format('wav')
      .save(audioFilePath)
      .on('end', async () => {
        // Transcribe the extracted audio using Google Cloud Speech-to-Text
        const audioContent = fs.readFileSync(audioFilePath).toString('base64');
        const audio = {
          content: audioContent,
        };
        const config = {
          encoding: 'LINEAR16',
          sampleRateHertz: 16000,
          languageCode: 'en-US',
        };
        const request = {
          audio,
          config,
        };
        const [response] = await client.recognize(request);
        const transcription = response.results
          .map((result) => result.alternatives[0].transcript)
          .join('\n');

        // Delete the temporary audio file
        fs.unlinkSync(audioFilePath);

        // Send the transcribed text back to the client
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
