import clientApi from '../client-api';

export const getChannelHist = async ( channelNo ) => {
  const { data } = await clientApi.get('/messenger/history/' + channelNo);

  return data;
};

export default getChannelHist;
