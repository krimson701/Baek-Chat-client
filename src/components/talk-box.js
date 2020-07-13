import React, { useState, useEffect } from 'react';
import styled, { injectGlobal }  from 'styled-components';

function TalkBox({
    userInfo
    , message
}){
    return(
        <div style = {{ position: 'relative', wordBreak: 'break-all', height: '160px', bottom: '0px', width: '90%', display: 'block' }} >
            <ProfileIcon src = "https://lh3.googleusercontent.com/proxy/GxpoMX12eOtmwit17rmE7izD-T4kls34cbgVBxSCIpMZ75rEU3TKc14AvqGkKfKCS1ltBHQQhIiBuqjcZRORWD_7L5vdjxXmH1EOu6RvQYIL3qudZDbTIhUQQAUgdL_kXY1N2r2-Q9PgK3tYBd2_ieWBoFD5lhCp4g" />
            <div style = {{ width: 'calc(100% - 113px)', float: 'left' }} > 
                <strong style = {{ position: 'relative', fontSize: '35px', float: 'left', margin: '13px 15px 0px'}}>test</strong> 
                <p style = {{ position: 'relative', fontSize: '23px', float: 'left', margin: '25px 0px 0px 10px ' }}>27:13 PM</p>
                <div style = {{ position: 'relative', fontSize: '30px', width: '100%', margin: '60px 0px 50px 15px', wordBreak: 'break-all' }}> { message } </div>
            </div>
        </div>    
    )
}

export default TalkBox; 

const ProfileIcon = styled.img`
    float: left;
    height: 85px;
    width: 85px;
    margin: 18px 10px 18px 18px;
    border: 3px solid gold;
    border-radius: 70px;
    -moz-border-radius: 70px;
    -khtml-border-radius: 70px;
    -webkit-border-radius: 70px;
`
