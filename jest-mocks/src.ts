import axios from 'axios';
import * as api from '@affixapi/api';

const apiVersion = '2023-03-01';

// per the respective api environment
const dev = `https://dev.api.affixapi.com/${apiVersion}`;
const prod = `https://api.affixapi.com/${apiVersion}`; // eslint-disable-line @typescript-eslint/no-unused-vars, no-unused-vars
const devEu = `https://dev.api-eu.affixapi.com/${apiVersion}`; // eslint-disable-line @typescript-eslint/no-unused-vars, no-unused-vars
const prodEu = `https://api-eu.affixapi.com/${apiVersion}`; // eslint-disable-line @typescript-eslint/no-unused-vars, no-unused-vars

const BASE_URL = dev; // set your api env

// we mock this call in the test; so we can just be a hardcoded fake string
const ACCESS_TOKEN = 'fake-jwt';
const authorizationHeader = { Authorization: `Bearer ${ACCESS_TOKEN}` };

export const getEmployees = async (): Promise<api.v20230301.Employees> =>
  (
    await axios.request<api.v20230301.Employees>({
      method: 'GET',
      url: `${BASE_URL}/developer/employees`,
      headers: { ...authorizationHeader },
    })
  ).data;

export const getPayruns = async (): Promise<api.v20230301.Employees> => {
  const startDate = '2020-01-01';
  const endDate = '2020-01-01';

  return (
    await axios.request<api.v20230301.Employees>({
      method: 'GET',
      url: `${BASE_URL}/developer/payruns?start_date${startDate}&end_date=${endDate}`,
      headers: { ...authorizationHeader },
    })
  ).data;
};

export const getPayrunDetail = async ({
  payrunId,
}: {
  payrunId: string;
}): Promise<api.v20230301.Payslips> =>
  (
    await axios.request<api.v20230301.Payslips>({
      method: 'GET',
      url: `${BASE_URL}/developer/payruns/${payrunId}`,
      headers: { ...authorizationHeader },
    })
  ).data;
