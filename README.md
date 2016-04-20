# mondoweb
Check your Mondo account from your browser

##Install
- Install Node.js & NPM
- Clone the repo
- Run `npm install`
- Create a `.env` file using [`.env-sample`](https://github.com/robcalcroft/mondoweb/blob/master/.env-sample) and insert your [Mondo OAuth credentials](https://developers.getmondo.co.uk/) where the `***`'s are

###For personal use of the application* OR production
In the repo folder, run `npm run build:prod` then use something like [PM2](https://github.com/Unitech/pm2) or you can use `npm run start:dev` (don't use this for actual production).

###For development
In the repo folder run `npm run build:dev` in a tab, then run `npm run start:dev` in another tab

---

*Only the owner of the Mondo OAuth credentials can sign in using their Mondo account to any OAuth app. This is a constraint from Mondo whilst it is still in beta.
