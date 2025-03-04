import testApi from "./testApi";

export interface GetRecordsParams {
  record?: string;
  partnership_id?: string;
}

export const getRecord = async (params: GetRecordsParams): Promise<Blob> => {
  const response = await testApi.post(
    `/mango/getRecord?record=${encodeURIComponent(params.record??'')}&partnership_id=${encodeURIComponent(params.partnership_id??'')}`,
    {},
    { responseType: "blob" }
  );
  return response.data;
};