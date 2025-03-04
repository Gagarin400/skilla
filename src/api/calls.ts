import { CallRecordsType } from '@/types/callsType';
import testApi from './testApi';

export interface GetCallsParams {
  date_start: string;
  date_end: string;
  in_out?: number;
}

export const getCalls = async (params: GetCallsParams): Promise<CallRecordsType> => {
  const response = await testApi.post('/mango/getList', {
    params: {
      date_start: params.date_start,
      date_end: params.date_end,
      in_out: params.in_out,
    },
  });
  return response.data.results;
};