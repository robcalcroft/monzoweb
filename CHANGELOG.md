###v1.2.0
Bug fixes and improvements

- Added peer to peer transfers to to interface - instead of a p2p transaction show as 'Mondo', it will now show the other party's name. [#22](https://github.com/robcalcroft/mondoweb/issues/22)
- Fixed issues where a lack of suggested tags would cause the JS to crash. [#23](https://github.com/robcalcroft/mondoweb/issues/23)
- When an AJAX error fails due to lack of or expiry of credentials and a refresh token cannot be used cached credentials are destroyed to force the application to logout upon reload. [#25](https://github.com/robcalcroft/mondoweb/issues/25)
- When your Mondo access token for the client expires mondoweb will now attempt to get you back on your feet using Mondo's refresh token to get you another fresh access token. [#27](https://github.com/robcalcroft/mondoweb/issues/27)

###v1.1.0
Bug fixes and improvements

- Fixed issue where Google Maps would load insecurely; compromising the security of the site [#16](https://github.com/robcalcroft/mondoweb/issues/16)
- Added local currency previews for international transactions [#19](https://github.com/robcalcroft/mondoweb/issues/19)
- Fixed declined transactions not being handled [#20](https://github.com/robcalcroft/mondoweb/issues/20)
- Fixed issue where amounts less than £1 would show as £99 instead of £0.99 [#21](https://github.com/robcalcroft/mondoweb/issues/21)

###v1.0.1
Install instructions improvements

###v1.0.0
First stable release of mondoweb

- Ability to login to the Mondo API using OAuth2
- View transaction list
- View individual transactions - including location, price, notes
- Search transactions
