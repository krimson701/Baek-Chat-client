import clientApi from '../client-api';

export const getChannelList = async () => {
  const { data } = await clientApi.get('/messenger/channel/list');

  return data;
};

export default getChannelList;
