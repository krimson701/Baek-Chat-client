import React from "react"

function Profile({ user }) {
    console.log("이거는 profile");
    
    console.log(user);
    const { userId, email, hobby } = user || {}
    console.log(userId);
        
    return (
        <>
            <h1>Profile</h1>
            <dt>아이디</dt>
            <dd>{userId}</dd>
            <dt>Email</dt>
            <dd>{email}</dd>
            <dt>취미</dt>
            <dd>{hobby}</dd>
        </>
    )
}

export default Profile