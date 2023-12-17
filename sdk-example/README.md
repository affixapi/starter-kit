# SDK example

## Quickstart

install the dependencies (including sdk),

```bash
npm install
```

call the sdk-example,

```bash
AFFIXAPI_ACCESS_TOKEN='your key here' ./start.ts
```

for example (key is a dev sandbox key):

  ```bash
  @mbp2:sdk-example $ AFFIXAPI_ACCESS_TOKEN=eyJhbGciOiJFUzI1NiIsImtpZCI6Ims5RmxwSFR1YklmZWNsUU5QRVZzeFcxazFZZ0Zfbk1BWllOSGVuOFQxdGciLCJ0eXAiOiJKV1MifQ.eyJwcm92aWRlciI6InNhbmRib3giLCJzY29wZXMiOlsiLzIwMjMtMDMtMDEvcGF5cm9sbC9lbXBsb3llZXMiLCIvMjAyMy0wMy0wMS9wYXlyb2xsL2lkZW50aXR5IiwiLzIwMjMtMDMtMDEvcGF5cm9sbC9wYXlydW5zIiwiLzIwMjMtMDMtMDEvcGF5cm9sbC9wYXlydW5zLzpwYXlydW5faWQiXSwidG9rZW4iOiJhOWU4NGU5MC1lMjFkLTQxYTUtYjZiMy1iYTYzOWM5NmVlYTYiLCJpYXQiOjE2OTE0MjY3MzUsImlzcyI6InB1YmxpY2FwaS1pbnRlcm1lZGlhdGUuZGV2LmVuZ2luZWVyaW5nLmFmZml4YXBpLmNvbSIsInN1YiI6InBheXJvbGwiLCJhdWQiOiIzRkRBRURGOS0xRENBNEY1NC04Nzk0OUY2QS00MTAyNzY0MyJ9.FDNYhm1Krq0ZPkKk-hfaF0q_8ot-0Zr2zfLW_dd_YrKEZEI3oopfhJMD4efE8qcPE6aFSnJeZbnT1Mq_c1IveA ./start.ts
  ```

what you will receive back as a response

```
$ AFFIXAPI_ACCESS_TOKEN='[[ redacted ]]' ./start.ts
{
  requestId: 'c37074ec-c5c7-45b4-898f-a792463599e3',
  traceId: 'Root=1-626e05b0-1e49a2cd340c02bb63c3d5cc'
  url: 'https://dev.api.affixapi.com/2023-03-01'
} if errors encountered, please send an email to `support@affixapi.com` with these ids

{
  identity: { email: 'Louisa_Bogan47@yahoo.com', name: 'Ernie Schmitt', phone_number: '+1 415 000-0000" }
}
```

### Notes

The script (`start.ts`) is currently set up to hit the dev environment.

To hit the other environments (`dev`, `prod`), you will need to do two changes to this example:

Edit BASE_URL to target the respective environment (here, we'll change this to the prod environment)

  ```typescript
  const BASE_URL = 'https://dev.api.affixapi.com/2023-03-01';
  ```

  to

  ```typescript
  const BASE_URL = 'https://api.affixapi.com/2023-03-01';
  ```
