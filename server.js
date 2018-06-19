require('dotenv').config();

const express = require('express');
const request = require('request');

const app = express();

app.get('/api/token', (req, res) => {
  if (!req.query.code && !req.query.grant_type) {
    return res.status(401).json({
      message: 'No authorisation code provided',
    });
  }

  return request.post({
    url: 'https://api.monzo.com/oauth2/token',
    form: {
      grant_type: req.query.grant_type || 'authorization_code',
      client_id: process.env.MONZO_CLIENT_ID,
      client_secret: process.env.MONZO_CLIENT_SECRET,
      redirect_uri: process.env.MONZO_REDIRECT_URI,
      [req.query.grant_type === 'refresh_token' ? 'refresh_token' : 'code']:
        req.query.grant_type === 'refresh_token' ? req.query.refresh_token : req.query.code,
    },
  }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      res.status(200).json(JSON.parse(body));
    } else {
      res.status(response.statusCode).json({
        message: body,
      });
    }
  });
});

app.listen(process.env.PORT || 8081, () => console.log('[', new Date(), ']', 'MonzoWeb API server running'));
