import clientApi from '../client-api';

export const getUser = async (userName) => {
  const { data } = await clientApi.get('/user/search/' + userName);

  return data;
};

export default getUser;
