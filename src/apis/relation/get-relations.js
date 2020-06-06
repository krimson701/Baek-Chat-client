import clientApi from '../client-api';

export const getRelations = async (type) => {
  const { data } = await clientApi.get('/relation/get/' + type);

  return data;
};

export default getRelations;
