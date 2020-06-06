import clientApi from '../client-api';

export const signIn = async () => {
  const { data } = await clientApi.post('/login/signIn');

  return data;
};

export default signIn;
