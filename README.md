# monzoweb
Check your Monzo account from your browser

## Install

1. [Install Node.js & npm](https://nodejs.org/en/download/package-manager/)
2. `git clone https://github.com/robcalcroft/monzoweb && cd monzoweb` Clone the repo and move into the directory
3. `npm install` Install dependencies
4. Create a `.env` file using [`.env-sample`](https://github.com/robcalcroft/monzoweb/blob/master/.env-sample) and insert your [Monzo OAuth credentials](https://developers.getmondo.co.uk/) where the `***`'s are. For the redirect URI, it should look like: `http://<HOST>:<PORT>/callback`. You'll also need a Google Maps JavaScript API key, available from https://developers.google.com/maps/documentation/javascript/get-api-key

### For personal use of the application* OR production

In the repo folder, run `npm run build` then use something like [PM2](https://github.com/Unitech/pm2) (you'll need to convert [`server.js`](https://github.com/robcalcroft/monzoweb/blob/master/server.js) to ES5 - `node_modules/.bin/babel server.js > server.es5.js`) or you can use `NODE_ENV=production npm start`


## Development

```
npm start
```

## Linting

```
npm run lint
```

---

__*Only the owner of the Monzo OAuth credentials can sign in using their Monzo account to any OAuth app. This is a constraint from Monzo whilst it is still in beta.__
