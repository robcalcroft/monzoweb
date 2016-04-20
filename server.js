import express from 'express';
import morgan from 'morgan';
import request from 'request';
import path from 'path';
import dotenv from 'dotenv';

dotenv.load();

let app = express();

// Logging
app.use(morgan('combined'));

// Static files
app.use(express.static(path.resolve(path.resolve('.'), 'dist')));

// Route to get our token
app.get('/token', (req, res) => {
  if (!req.query.code) {
    return res.status(401).json({
      message: 'No authorisation code provided'
    });
  }

  request.post({
    url: 'https://api.getmondo.co.uk/oauth2/token',
    form: {
      grant_type: 'authorization_code',
      client_id: process.env.MONDO_CLIENT_ID,
      client_secret: process.env.MONDO_CLIENT_SECRET,
      redirect_uri: process.env.MONDO_REDIRECT_URI,
      code: req.query.code
    }
  }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      res.status(200).json(JSON.parse(body));
    } else {
      res.status(response.statusCode).json({
        message: body
      });
    }
  });
});

// Send everything else to react-router
app.use('*', (req, res) => {
  res.sendFile(path.resolve('.', 'dist/index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Mondoweb server running on port ${process.env.PORT || 8000}`);
});
