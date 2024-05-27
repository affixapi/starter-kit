import axios from 'axios';
import * as api from '@affixapi/api';

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import { getEmployees, getPayruns, getPayrunDetail } from './src';
import { HttpError } from './utils';

jest.mock('axios', () => ({
  request: jest.fn(),
}));

const payrunId = 'cD0yMDIxLTAxLTA2KzAzJTNBMjQlM0E1My40MzQzMjYlMkIwMCUzQTAw';

// NOTE: mock your specific data scenario here!
const payruns: api.v20230301.Payruns = [
  {
    id: payrunId,
    remote_id: '19202938',
    state: 'paid',
    type: 'regular',
    start_date: '2020-01-01',
    end_date: '2020-01-15',
    payment_date: '2020-01-15',
  },
];

// NOTE: mock your specific data scenario here!
const payslips: api.v20230301.Payslips = [
  {
    id: 'cD0yMDIxLTAxLTA2KzAzJTNBMjQlM0E1My40MzQzMjYlMkIwMCUzQTAw',
    remote_id: '19202938',
    employee_id: 'd2f972d0-2526-434b-9409-4c3b468e08f0',
    payrun_id: payrunId,
    currency: 'usd',
    gross_pay: 134267,
    net_pay: 86578,
    start_date: '2020-01-01',
    employee_remote_id: '100234',
    payrun_remote_id: '19202938',
    payrun_type: 'regular',
    end_date: '2020-01-15',
    payment_date: '2020-01-15',
    earnings: [
      {
        amount: 100234,
        name: 'SALARY',
        hours: 80,
      },
      {
        amount: 834234,
        name: 'OVERTIME',
        hours: 8,
      },
    ],
    contributions: [
      {
        name: 'Private Health Insurance (Employer)',
        amount: 13454,
      },
      {
        name: 'Transportation allowance benefit (Employer)',
        amount: 3454,
      },
      {
        name: 'Other (Employer)',
        amount: 3454,
      },
    ],
    deductions: [
      {
        name: 'Transportation allowance benefit',
        amount: 3454,
      },
      {
        name: 'Private Health Insurance (Employee)',
        amount: 3454,
      },
    ],
    taxes: [
      {
        name: 'PRSI',
        amount: 725,
        employer_tax: false,
      },
      {
        name: 'PSC (Class S)',
        amount: 125,
        employer_tax: false,
      },
      {
        name: 'Income Tax',
        amount: 10025,
        employer_tax: false,
      },
      {
        name: 'Payroll Tax',
        amount: 10025,
        employer_tax: true,
      },
    ],
  },
];

const mock200Payruns = () => {
  axios.request
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .mockImplementationOnce(async () => ({ data: payruns }));

  return axios;
};

const mock200PayslipResponse = () => {
  axios.request
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .mockImplementationOnce(async () => ({ data: payslips }));

  return axios;
};

const mock202 = () => {
  axios.request
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .mockImplementationOnce(async () => ({
      data: {
        message:
          'Pending - Retry your call after the specified amount of seconds',
      },
    }));

  return axios;
};

const mock401 = () => {
  axios.request
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .mockImplementationOnce(async () => {
      throw new HttpError({
        data: { message: 'Reauthentication required' },
        status: 401,
      });
    });

  return axios;
};

describe('affixapi jest mocks', () => {
  // NOTE: you can mock a 2xx/4xx with the mock situations below, and write
  // source code that handles those specific scnarios

  // For example, let's say the JWT has been manually disconnected by the user
  // (hence a 401); you may want to prompt the user to reconnect their account
  // to affix

  // You can write source code that handles that case, and use the sample mocks
  // to unit test your code to make sure the case is handled appropriately
  describe('2xx mocks', () => {
    it('mocks a payruns request that responds w a 200', async () => {
      mock200Payruns();

      const expected = payruns;

      const actual = await getPayruns();

      expect(actual).toStrictEqual(expected);
    });

    it('mocks a payrun-details (payslips) request that responds w a 200', async () => {
      mock200PayslipResponse();

      const expected = payslips;

      const actual = await getPayrunDetail({ payrunId });

      expect(actual).toStrictEqual(expected);
    });

    it('mocks a 202', async () => {
      mock202();

      const expected = {
        message:
          'Pending - Retry your call after the specified amount of seconds',
      };

      const actual = await getPayruns();

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('4xx mocks', () => {
    it('mocks a 401', async () => {
      mock401();

      const actual = async () => getPayruns();

      await expect(actual()).rejects.toThrowError('Reauthentication required');
    });
  });
});
