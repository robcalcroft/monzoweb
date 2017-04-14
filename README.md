# monzoweb
Check your Monzo account from your browser

## Install

1. [Install Node.js & npm](https://nodejs.org/en/download/package-manager/)
2. `git clone https://github.com/robcalcroft/monzoweb && cd monzoweb` Clone the repo and move into the directory
3. `npm install` or `yarn` Install dependencies
4. Create a `.env` file using [`.env-sample`](https://github.com/robcalcroft/monzoweb/blob/master/.env-sample) and insert your [Monzo OAuth credentials](https://developers.getmondo.co.uk/) where the `***`'s are. For the redirect URI, it should look like: `http://<HOST>:<PORT>/callback`. You'll also need a Google Maps JavaScript API key, available from https://developers.google.com/maps/documentation/javascript/get-api-key

### For personal use of the application* OR production

```
npm run build
NODE_ENV=production npm start
```

Then I recommend using something like [PM2](https://github.com/Unitech/pm2) to run this in the background for you.


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
