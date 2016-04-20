# mondoweb
Check your Mondo account from your browser

##Install
- Install Node.js & NPM
- Clone the repo
- Run `npm install`
- Create a `.env` file using `.env-sample` and insert your Mondo credentials where the `***`'s are

###For use of the application / production
In the repo folder, run `npm run build:prod` then use something like [PM2](https://github.com/Unitech/pm2) or you can use `npm run start:dev` (don't use this for actual production)

###For development
In the repo folder run `npm run build:dev` in a tab, then run `npm run start:dev` in another tab
