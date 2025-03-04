import { useQuery } from '@tanstack/react-query';
import { getCalls, GetCallsParams } from './calls';

const useCalls = (params: GetCallsParams) => {
  return useQuery({
    queryKey: ['calls', params],
    queryFn: () => getCalls(params),
    staleTime: 0,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
};

export default useCalls;