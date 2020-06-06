import clientApi from '../client-api';

export const postRelation = async (params) => {
    const { data } = await clientApi.post('/relation/insert', null, { params } );
  
    return data;
  };

export default postRelation;
