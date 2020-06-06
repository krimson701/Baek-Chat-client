import axios from 'axios'
import { WebServerConstant } from '../constants'

/*
    axios 인스턴스를 생성합니다.
    생성할때 사용하는 옵션들 (baseURL, timeout, headers 등)은 다음 URL에서 확인할 수 있습니다.
    https://github.com/axios/axios 의 Request Config 챕터 확인
*/
const clientApi = axios.create({
    baseURL: WebServerConstant.Server.API_HOST
  });

/*
    1. 요청 인터셉터를 작성합니다.
    2개의 콜백 함수를 받습니다.

    1) 요청 바로 직전 - 인자값: axios config
    2) 요청 에러 - 인자값: error
*/
clientApi.interceptors.request.use(
    function (config) {
        const { url = '', data } = config;
        // 요청 바로 직전
        // axios 설정값에 대해 작성
        config.headers = { ["Authorization"]: localStorage.getItem("Authorization") };  // 헤더 값으로 bearer 추후 추가해줘야함

        if ('showNetworkStatus' in window || 'showNetworkRequest' in window) {
            console.groupCollapsed(
              '%c API request...',
              'background-color:#FFFF00; color:#000; font-size: 120%',
              url,
              ',  data:',
              (data instanceof URLSearchParams
                ? data.toString()
                : JSON.stringify(data)) || 'no-data',
            );
            console.trace();
            console.groupEnd();
          }
      
        return config;
    }, 
    function (error) {
        // 요청 에러 처리
        return Promise.reject(error);
    }
);




/*
    2. 응답 인터셉터를 작성합니다.
    2개의 콜백 함수를 받습니다.

    1) 응답 정성 - 인자값: http response
    2) 응답 에러 - 인자값: http error

    아직은 응답 인터셉터 구상없으므로 예제만 추가
*/
clientApi.interceptors.response.use(
    function (response) {
    /*
        http status가 200인 경우
        응답 바로 직전에 대해 작성
    */

        return response;
    },

    function (error) {
        /*
            http status가 200이 아닌 경우
            응답 에러 처리를 작성

            타입 스크립트 사용할때 수정 예정
        */
        if (error.response && error.response.config) {
            const { url, data } = error.response.config;

            if ('showNetworkStatus' in window || 'showNetworkResponse' in window) {
                console.groupCollapsed(
                    '%c Err ',
                    'background-color:#FF0000; color:#FFF; font-size: 120%',
                    url,
                    ', data:',
                    data instanceof URLSearchParams
                        ? data.toString()
                        : JSON.stringify(data),
                );
                console.groupEnd();
            }
            return Promise.reject(error);
        }
    }
);

export default clientApi;