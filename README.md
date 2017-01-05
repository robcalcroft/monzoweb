# monzoweb
Check your Monzo account from your browser

##Install
- Install Node.js & NPM
- Clone the repo
- Run `npm install`
- Create a `.env` file using [`.env-sample`](https://github.com/robcalcroft/monzoweb/blob/master/.env-sample) and insert your [Monzo OAuth credentials](https://developers.getmondo.co.uk/) where the `***`'s are. For the redirect URI, it should look like: `http://<HOST>:<PORT>/callback`. You'll also need a Google Maps JavaScript API key, available from https://developers.google.com/maps/documentation/javascript/get-api-key

###For personal use of the application* OR production
In the repo folder, run `npm run build` then use something like [PM2](https://github.com/Unitech/pm2) (you'll need to convert [`server.js`](https://github.com/robcalcroft/monzoweb/blob/master/server.js) to ES5 - `node_modules/.bin/babel server.js > server.es5.js`) or you can use `npm run start` (don't use this for actual production).

###For development
In the repo folder run `npm run dev` in a tab, then run `npm run start` in another tab

---

*Only the owner of the Monzo OAuth credentials can sign in using their Monzo account to any OAuth app. This is a constraint from Monzo whilst it is still in beta.
