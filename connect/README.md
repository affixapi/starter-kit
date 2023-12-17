# Connect

<p align="center">
  <a href="https://affixapi.com">
    <video src = "./../dev-resources/connect.mp4" playsinline autoplay muted loop width = 300px>

  </a>
</p>

## Overview

Affix API is an oauth 2.1 application that allows developers to access data,
without developers needing to manage integrations or collect login credentials
from users for these third party systems.

Connect provides a secure and convenient authorisation flow for your users to
grant your application access to their provider accounts.

## Integrate

There are two ways to integration Connect into your application's UI.

- your application can generate a connect uri and then redirect your user's
  browser to connect, hosted by Affix API at `https://connect.affixapi.com`.
- your application can open Connect in an `iframe` using the react SDK. Your
  user remains on your domain during the entire authorisation flow.

## Parameters to Connect

use these query params (`?param=_value`) to modify behavior of connect to
trigger your desired use case

```
 // your application's id
- client_id // required

// the type of providers you are after, ie `official` (Layer 1 integrations /
API aggregator mode), `developer` (Layer 2 integrations / "God mode")
- mode // required

// where to redirect the user after a successful authorisation.
// the redirect url will include both `?authorization_code=...&state=...`
// if state was provided; if state was omitted, then there
// will be no state query param in the callback
- redirect_uri // required

// the scopes you are requesting from the user's account, ie `/2023-03-01/official/employees`
- scope // required

// skip the `Select` page if you already know the user's provider. not required
- provider // optional

// provides a simulated authorisation and data flow. uses fake data.
- sandbox // optional

// open-ended field that your application will as a query parameter
// during the callback after a successful authorisation.
// example: your user's internal id
- state // optional

// toggle adding an admin to the account or not. enabled by default if applicable
- add_admin // optional

// only present a list of pre-requested integrations, ie:
//   - `&tags=uk`
//   - `&tags=uk fr`
//   - `&tags=payroll`
//   - `&tags=hr payroll`
//   - `&tags=uk payroll`
//   - `&tags=uk fr payroll`
- tags // optional
```

## Appendix
### Glossary

- **connect** the affixapi front end, whose url a developer will generate and send to the user
- **user** (_ex_ _john smith_) someone who has an account with a provider's system
- **provider** (_ex_ _amazon_) system that does not easily provide a programmatic interface for the developer to use to access data from the user's account
