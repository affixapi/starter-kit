## curl scripts

## auth

### token

use this script as a helper to obtain an access token.
recall that the flow is `authorization_code` (via connect) -> token

run it:

```
./token [auth_code]
```

## data
### identity

use this script as a helper to obtain the identity response from the api

run it:

```
./identity [access_token]
```

### employees

use this script as a helper to obtain the employees response from the api

run it:

```
./employees [access_token]
```

### payruns

use this script as a helper to obtain the orders response from the api

run it:

```
./payruns [access_token]
```

edit the script's `start_date` and `end_date` to change the date of the payruns
requested

### payrun-details

use this script as a helper to obtain the payrun-details response from the api

run it:

```
./payrun-details [access_token]
```
