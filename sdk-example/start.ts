#!/usr/bin/env -S npx ts-node -P tsconfig.json
import * as api from '@affixapi/api-with-joi';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import joi from 'joi';

const apiVersion = '2023-03-01';

// per the respective api environment
const dev = `https://dev.api.affixapi.com/${apiVersion}`;
const prod = `https://api.affixapi.com/${apiVersion}`; // eslint-disable-line @typescript-eslint/no-unused-vars, no-unused-vars

const BASE_URL = dev; // set your api env / region

const ACCESS_TOKEN = process.env.AFFIXAPI_ACCESS_TOKEN; // keep this private

if (!ACCESS_TOKEN)
  throw new Error(
    'api key not found; load it with `AFFIXAPI_ACCESS_TOKEN="..." ./start.ts`'
  );
const authorizationHeaderValue = `Bearer ${ACCESS_TOKEN}`; // `Key` if dev or prod, `Sandbox` if sandbox
const authorizationHeader = { Authorization: authorizationHeaderValue };

/** mode = Developer */

// types
type Identity = api.v20230301.IdentityResponse;
type Employees = api.v20230301.Employees;
type Payruns = api.v20230301.Payruns;
type Payslips = api.v20230301.Payslips;

// identity endpoint
const getIdentity = async (): Promise<Identity> => {
  const response = await axios.request<AxiosResponse<Identity>>({
    method: 'GET',
    url: `${BASE_URL}/developer/identity`,
    headers: { ...authorizationHeader },
  });

  return handleResponse<Identity>({
    response,
    joiType: api.joi.v20230331.identity,
  });
};

// employees endpoint
const getEmployees = async (): Promise<Employees> => {
  const response = await axios.request<AxiosResponse<Employees>>({
    method: 'GET',
    url: `${BASE_URL}/developer/employees`,
    headers: { ...authorizationHeader },
  });

  return handleResponse<Employees>({
    response,
    joiType: api.joi.v20230331.employees,
  });
};

// payruns endpoint
const getPayruns = async (): Promise<Payruns> => {
  const startDate = '2022-04-01';
  const endDate = '2022-04-30';

  const response = await axios.request<AxiosResponse<Payruns>>({
    method: 'GET',
    url: `${BASE_URL}/developer/payruns?start_date=${startDate}&end_date=${endDate}`,
    headers: { ...authorizationHeader },
  });

  return handleResponse<Payruns>({
    response,
    joiType: api.joi.v20230331.payruns,
  });
};

// payslips
const payrunDetails = async ({
  payrunId,
}: {
  payrunId?: string;
}): Promise<Payslips | null> => {
  if (!payrunId) return null;

  const response = await axios.request<AxiosResponse<api.v20230301.Payslips>>({
    method: 'GET',
    url: `${BASE_URL}/developer/payruns/${payrunId}`,
    headers: { ...authorizationHeader },
  });

  return handleResponse<Payslips>({
    response,
    joiType: api.joi.v20230331.payslips,
  });
};

/** Main */
(async (): Promise<void> => {
  try {
    const [payruns, identity, employees] = await Promise.all([
      getPayruns(),
      getIdentity(),
      getEmployees(),
    ]);

    console.log({ identity });
    console.log({ employees });
    console.log({ payruns });

    if (payruns.length) {
      const [{ id: payrunId }] = payruns;
      const payslips = await payrunDetails({ payrunId });

      console.log({ payslips });
    }
  } catch (err) {
    console.log({ err });
    process.exit(1);
  }

  process.exit(0);
})();

/** helpers, they joi validate the data along with print out the debugging information */
function handleResponseBase<T>({ response }: { response: AxiosResponse }): T {
  const {
    headers: { 'x-amzn-requestid': requestId, 'x-amzn-trace-id': traceId },
    data,
  } = response;

  const apiResponse: T = data; // to type `apiResponse` -- if you destructure inline on L72 (`data`) it will have an `any` type, so we want to property type this

  console.log(
    { requestId, traceId, url: BASE_URL },
    'if errors encountered, please send an email to `support@affixapi.com` with these ids\n'
  );

  return apiResponse;
}

function handleResponse<T>({
  response,
  joiType,
}: {
  response: AxiosResponse;
  joiType: joi.ObjectSchema<T> | joi.ArraySchema;
}): T {
  const apiResponse = handleResponseBase<T>({ response });

  if (!apiResponse) throw new Error('Failure!');

  const { value: validatedPayload, error } = joiType.validate(apiResponse, {
    abortEarly: true,
    presence: 'required',
  }) as {
    value: T;
    error: joi.ValidationError | undefined;
  };

  if (error) {
    console.log({ error });
    throw new Error('Did not get expected result back from server');
  }

  return validatedPayload;
}
