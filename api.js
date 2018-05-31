const express = require('express');
const request = require('request');

const { MONZO_CLIENT_ID, MONZO_CLIENT_SECRET, MONZO_REDIRECT_URI } = process.env;
const app = express();

if (!MONZO_CLIENT_ID || !MONZO_CLIENT_SECRET || !MONZO_REDIRECT_URI) {
  throw Error('Missing required Monzo credential(s)');
}

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
      client_id: MONZO_CLIENT_ID,
      client_secret: MONZO_CLIENT_SECRET,
      redirect_uri: MONZO_REDIRECT_URI,
      [req.query.grant_type === 'refresh_token' ? 'refresh_token' : 'code']:
        req.query.grant_type === 'refresh_token' ? req.query.refresh_token : req.query.code,
    },
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.status(200).json(JSON.parse(body));
    } else {
      res.status(response.statusCode).json({
        message: body,
      });
    }
  });
});

app.listen(process.env.PORT || 8081);
