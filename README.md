<p align="center">
  <a href="https://affixapi.com">
    <img src = "./dev-resources/Word__logo.png" width = 200px>
  </a>
</p>

## Starter kit resources

- [Connect guide](./connect): examples on how to use [Connect](https://dev.connect.affixapi.com/?client_id=3FDAEDF9-1DCA4F54-87949F6A-41027643&mode=payroll&scope=/2023-03-01/payroll/identity%20/2023-03-01/payroll/employees%20/2023-03-01/payroll/payruns%20/2023-03-01/payroll/payruns/:payrun_id%20&redirect_uri=https://affixapi.com&sandbox=true)
- [SDK usage example](./sdk-example): examples on how to use the [SDK](https://www.npmjs.com/package/@affixapi/api)
- [curl collection](./curl-collection): example scripts calling the api with `curl`
- [jest mocks](./jest-mocks): example jest mocks to test specific scenarios of `affixapi` responses

## Authenticating with affixapi

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

With your `client_id` key, you are ready to start the authenticate flow with
live users. Using [Connect](./connect) successfully will generate an
`authorzation_code`, which you can then use the [curl
scripts](./curl-collection) to obtain an `access_token`. With the
`access_token`, you are now ready to call the affixapi API.

In all API calls to you must include the API key in the `Authorization` header:
`"Authorization" : "Bearer <Access_Token>"`.

## Read our documentation

- [API Reference](https://docs.affixapi.com/)

## Get in touch
- [Send us a message](mailto:hello@affixapi.com) to talk to our development team
- [Create an issue](https://github.com/affixapi/starter-kit/issues) in this repo if you encounter a bug
