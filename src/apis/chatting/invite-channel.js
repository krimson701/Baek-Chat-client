import clientApi from '../client-api';

export const inviteChannel = async (params) => {
  const { data } = await clientApi.post('/messenger/channel/invite', null, {params});

  return data;
};

export default inviteChannel;
