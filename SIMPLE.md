# Monzo web - a simple guide
If you're not a developer this is the guide for you!

First thing we need to do is get our login credentials that will allow Monzo web to talk to Monzo's servers and fetch things like your balance and transactions.

To do this, we need to log in to the developer site.

1. First, visit https://developers.monzo.com and click `Sign in with your Monzo account`.
2. It'll take you to a login page for Monzo, click `Authorize` where you can enter the email you use to log in to Monzo.
3. Once you've entered your email address you'll get an email, click the button in the email.
4. That link will log you into the developer site (remember these instructions for later, as we'll log into Monzo web the same way)

Now that we're logged in, we can create our credentials. There are three distict credentials, they are the **client id**, which is used to identify the application itself, the **client secret**, which acts as a password of sorts and should be kept secure as you would a password, finally there's the redirect URI, this is a link that tells Monzo where to send you back to after you've logged in, in this case it will be sending you back to Monzo web.

1. Click `Clients` in the menu bar
2. Click `New OAuth client`
3. Enter a name, like `Monzo web`
4. Enter a redirect URL, which we'll put as `http://localhost:8080/callback`
5. Add a description, as Monzo require it
6. Set the confidentiality to `Confidential`
7. Click `Submit`
8. Click on the client you've just created
9. You've now got credentials to use with Monzo web!

Next, we're going to install Monzo web to our machine along with some extra tools to make it run.

### Mac or Linux users use these instructions
1. Open the Terminal app
2. Use this [guide to check if you have Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), it'll help you install it if you haven't
3. Once you have Git installed you need to [install Node.js](https://nodejs.org/en/download/) use the Mac installer at the top or install using one of the Linux binaries
4. Check you've installed Node.js correctly by running `node -v` in the Terminal, it should print a set of numbers, do the same with `npm -v` and check it too prints some numbers

### Windows users use these instructions
1. [Download Git](https://git-scm.com/download/win)
2. Open the downloaded installer and follow it through to install.
3. Open a command prompt and type `git -v` to check its installed, it should print out a number.
4. Once you have Git installed you need to [install Node.js](https://nodejs.org/en/download/) use the Windows installer at the top.
5. Check you've installed Node.js correctly by running `node -v` in the Terminal, it should print a set of numbers, do the same with `npm -v` and check it too prints some numbers.

Now that we've installed Monzo web and the tools it runs with we can configure the app.

1. Download the source code with this command `git clone https://github.com/robcalcroft/monzoweb.git`, which should be pretty quick.
2. Change into the folder that was created when the source code downloaded with `cd monzoweb`.
3. Install all the extra libraries Monzo web uses to run with `npm install`.
4. Create a copy of the example credentials file with `cp .env-example .env` or `copy .env-example .env` for Windows.
5. Open the new file in a text editor, with `open -e .env` for Mac and `notepad .env` for Windows.
6. Edit the variables and replace with the credentials we made in the first step, the last credential, the `GOOGLE_MAPS_API_KEY` can be created here 
https://developers.google.com/maps/documentation/javascript/get-api-key
7. Now you're ready to rock!

Checkout the README.md file to learn how to boot the servers (it's just running some more terminal commands :smile:).
