###v2.0.0
First major point release bump! :two:

Bugs squished and improvements made by community members :tada:

Some fantastic UI improvements and internal refactoring by @zaccolley :sunglasses:

- Add missing environment variables warning message #55 @zaccolley
- Remove sweetalert and add in new Alert component #51 @zaccolley
- Improved messages on declined transactions #47 @florx
- Refactored structure of app (Flattened out directories in components, renamed components, simplified data state) #46 @zaccolley
- Improve development workflow with hot reloading #46 @zaccolley
- Add favicon #39 @zaccolley
- Added SVG category icons for when merchant has no image #38 @zaccolley
- Add yarn support #36 @zaccolley
- Updated use of key for Google Maps API #33 @imascarenhas
- Fixed `=`'s in OAuth2 auth codes breaking the string manipulation #32

###v1.3.1
Some new internals and a fresh re-branding

- Migrated jQuery AJAX to use a Fetch polyfill, native support is [slowly getting there](http://caniuse.com/#search=fetch), jQuery is still loaded in for Materialize to use but I'm planning to try and gut the JS for Materialize [#28](https://github.com/robcalcroft/monzoweb/issues/28)
- Re-branded the UI and internals after [Mondo's re-branding to Monzo](https://monzo.com/blog/2016/08/25/monzo/) [#31](https://github.com/robcalcroft/monzoweb/issues/31)

###v1.3.0
The map is here!

- Added interactive map which displays all your physical* transactions. Additional functionality for this feature is actively requested! [#9](https://github.com/robcalcroft/monzoweb/issues/9)
- Refactored some stuff [#29](https://github.com/robcalcroft/monzoweb/issues/29)

###v1.2.0
Bug fixes and improvements

- Added peer to peer transfers to to interface - instead of a p2p transaction show as 'Mondo', it will now show the other party's name. [#22](https://github.com/robcalcroft/monzoweb/issues/22)
- Fixed issues where a lack of suggested tags would cause the JS to crash. [#23](https://github.com/robcalcroft/monzoweb/issues/23)
- When an AJAX error fails due to lack of or expiry of credentials and a refresh token cannot be used cached credentials are destroyed to force the application to logout upon reload. [#25](https://github.com/robcalcroft/monzoweb/issues/25)
- When your Mondo access token for the client expires mondoweb will now attempt to get you back on your feet using Mondo's refresh token to get you another fresh access token. [#27](https://github.com/robcalcroft/monzoweb/issues/27)

###v1.1.0
Bug fixes and improvements

- Fixed issue where Google Maps would load insecurely; compromising the security of the site [#16](https://github.com/robcalcroft/monzoweb/issues/16)
- Added local currency previews for international transactions [#19](https://github.com/robcalcroft/monzoweb/issues/19)
- Fixed declined transactions not being handled [#20](https://github.com/robcalcroft/monzoweb/issues/20)
- Fixed issue where amounts less than £1 would show as £99 instead of £0.99 [#21](https://github.com/robcalcroft/monzoweb/issues/21)

###v1.0.1
Install instructions improvements

###v1.0.0
First stable release of mondoweb

- Ability to login to the Mondo API using OAuth2
- View transaction list
- View individual transactions - including location, price, notes
- Search transactions
