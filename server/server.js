const dotenv = require('dotenv');
const path = require('path');

const express = require('express');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());

dotenv.config();

const multer = require('multer');

const cors = require('cors');
const { submitResume } = require('./controllers/resume');
const { sendVideoForTranscription } = require('./controllers/transcriptions');
const { convertToPDF } = require('./controllers/convertToPdf');
const { saveOrUpdateUser } = require('./db/db');

app.use(cors({ origin: 'http://localhost:3000' }));

const upload = multer({ dest: 'uploads/' });

// routes for OpenAI api calls
app.post('/api/openai/resume', submitResume);
app.post('/api/openai/transcribe', upload.single('video'), sendVideoForTranscription);
app.post('/api/convertToPdf', convertToPDF);
app.get('/update', (req, res) => {
  saveOrUpdateUser(req.query.name, req.query.email)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Catch-all route for React Router
app.get('*', (req, res) => {
  console.log('getting main page');
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
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
