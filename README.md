# :moneybag: monzoweb
Check your Monzo account from your browser

## Getting Started
1. [Install Node.js & yarn](https://nodejs.org/en/download/package-manager/)
2. `git clone https://github.com/robcalcroft/monzoweb && cd monzoweb`
3. `yarn` to install dependencies
4. Setup your environment by setting the following variables in your shell:
```
export MONZO_CLIENT_ID=...
export MONZO_CLIENT_SECRET=...
export MONZO_REDIRECT_URI=...
export GOOGLE_MAPS_API_KEY=...
export PORT=... (this is optional, the API server runs on 8081 by default)
```
For the redirect URI, it should look like: `https://<your domain>/callback`.

You'll also need to grab a Google Maps JavaScript API key, available from https://developers.google.com/maps/documentation/javascript/get-api-key

5. Boot the app with `yarn start` which starts the dev server and opens the app in a browser.
6. In another terminal, run the API server with `yarn start:backend` which allows the frontend app to authenticate with Monzo's servers.

## Running the app for personal use
For when you want to use the app without development mode, you can build a static version of the app with `yarn build`. You can then serve the contents of the `dist` directory with something like Nginx. You need to ensure all requests except those starting with `/api` send `index.html` to the client. You can look at `nginx.example.conf` for inspiration. Finally you need to run the API server, I suggest using something like [PM2](http://pm2.keymetrics.io/) to manage the process.

---

__*Only the owner of the Monzo OAuth credentials can sign in using their Monzo account to any OAuth app. This is a constraint from Monzo whilst it is still in beta.__
