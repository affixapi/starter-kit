<p align="center">
  <a href="https://affixapi.com">
    <img src = "./dev-resources/Word__logo.png" width = 200px>
  </a>
</p>

## Starter kit resources

- [Connect guide](./connect): examples on how to use [Connect](https://dev.connect.affixapi.com/?client_id=3FDAEDF9-1DCA4F54-87949F6A-41027643&mode=payroll&scope=/2023-03-01/payroll/identity%20/2023-03-01/payroll/employees%20/2023-03-01/payroll/payruns%20/2023-03-01/payroll/payruns/:payrun_id%20&redirect_uri=https://affixapi.com&sandbox=true)
- [Typescript SDK usage example](./sdk-example): examples on how to use the [Typescript SDK](https://www.npmjs.com/package/@affixapi/api)
- [curl collection](./curl-collection): example scripts calling the api with `curl`
- [jest mocks](./jest-mocks): example jest mocks to test specific scenarios of `affixapi` responses

## SDKs

### Frontend
- [React](https://www.npmjs.com/package/@affixapi/connect-sdk)

### Backend
- [Typescript](https://www.npmjs.com/package/@affixapi/api)
- [Go](https://pkg.go.dev/github.com/affixapi/go-sdk)

## Read our documentation

- [API Reference](https://docs.affixapi.com/)

## Launch

With your `client_id` key, you are ready to start the authenticate flow with
live users. Using [Connect](./connect) successfully will generate an
`authorzation_code`, which you can then use the [curl
scripts](./curl-collection) to obtain an `access_token`. With the
`access_token`, you are now ready to call the affixapi API.

In all API calls to you must include the API key in the `Authorization` header:
`"Authorization" : "Bearer <Access_Token>"`.

## Get in touch
- [Send us a message](mailto:hello@affixapi.com) to talk to our development team
- [Create an issue](https://github.com/affixapi/starter-kit/issues) in this repo if you encounter a bug
