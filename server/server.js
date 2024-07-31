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
const { sendVideoForTranscription } = require('./controllers/transcriptions');
const { submitResume } = require('./controllers/resume');
const { convertToPDF } = require('./controllers/convertToPdf');
const { saveOrUpdateUser } = require('./db/db');
const { imageCreation } = require('./controllers/imageCreation');
const { coverLetter } = require('./controllers/coverLetter');
const { sqlQuery } = require('./controllers/sqlQuery');

app.use(cors({ origin: 'http://localhost:3000' }));

const upload = multer({ dest: 'uploads/' });

// routes for OpenAI api calls
app.post('/api/openai/resume', submitResume);
app.post('/api/openai/transcribe', upload.single('video'), sendVideoForTranscription);
app.post('/api/convertToPdf', convertToPDF);
app.post('/api/openai/image-creation', imageCreation);
app.post('/api/openai/cover-letter', coverLetter);
app.post('/api/openai/sql-query', sqlQuery);
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
