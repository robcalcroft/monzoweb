require('dotenv').load();

const express = require('express');
const morgan = require('morgan');
const request = require('request');
const path = require('path');

const inDevelopment = process.env.NODE_ENV !== 'production';

let app = express();

if (inDevelopment) {
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config');

  const compiler = webpack(config);

  app.use(devMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true
  }));

  app.use(hotMiddleware(compiler));
} else {
  // Static files
  app.use(express.static(path.resolve(path.resolve('.'), 'dist')));
}

// Logging
app.use(morgan('combined'));

// Route to get our token
app.get('/token', (req, res) => {
  if (!req.query.code && !req.query.grant_type) {
    return res.status(401).json({
      message: 'No authorisation code provided'
    });
  }

  request.post({
    url: 'https://api.getmondo.co.uk/oauth2/token',
    form: {
      grant_type: req.query.grant_type || 'authorization_code',
      client_id: process.env.MONZO_CLIENT_ID,
      client_secret: process.env.MONZO_CLIENT_SECRET,
      redirect_uri: process.env.MONZO_REDIRECT_URI,
      [req.query.grant_type === 'refresh_token' ? 'refresh_token' : 'code']:
        req.query.grant_type === 'refresh_token' ? req.query.refresh_token : req.query.code
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
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, inDevelopment ? 'src' : 'dist', 'index.html'));
});

app.listen(process.env.PORT || 8000, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log(`🌐 Listening at http://localhost:${process.env.PORT || 8000}/`);
  console.log(`${inDevelopment ? '🛠 Development' : '🚀 Production'} mode`);
});
