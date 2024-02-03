## Self-Signup with Affix API

- Go [register](https://register.affixapi.com/) to purchase API key(s).
- You will receive your `client_id` (your license key) in the email you specified.
- You may cancel at anytime using the management link sent to your email.
- Your `client_secret` will be initially set as your `client_id` (the same
  value). Setting this value provents authorized parties from generating access
  tokens under your client id (ie a billing concern), but otherwise is not a
  security concern.
- Your `redirect_uri` will be initially set as `https://affixapi.com`. You may
  set multiple `redirect_uri`s
- The name of your application will be initially set as your emaill address.

After self-signup, please email me to set these values for your client application:
- `client_secret` (I will generate a unique value)
- `redirect_uri` (you may send me multiple uris)
- `name` (your application name)
