const OpenAI = require('openai');
const dotenv = require('dotenv');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sendVideoForTranscription = async (req, res) => {
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
};

module.exports = {
  sendVideoForTranscription,
};
