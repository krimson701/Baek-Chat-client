import axios from 'axios';

export async function signIn({userId}) { 

    const user = await axios.get(
            'http://localhost:8080/user/get', {
            params: { userId: userId }
        }).catch(function (error) {
            if (error.response) {
              // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
            else if (error.request) {
              // 요청이 이루어 졌으나 응답을 받지 못했습니다.
              // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
              // Node.js의 http.ClientRequest 인스턴스입니다.
              console.log(error.request);
            }
            else {
              // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
              console.log('Error', error.message);
            }
        })
    console.log("이제서야 디비조회 끝남");
    console.log("Id : "+ userId);
    console.log(user.data);
    if (user == "") throw new Error()
    return user.data
    
}