import React, { useState } from "react"
import { Redirect } from "react-router-dom"

function LoginForm({ authenticated, login, location }) {
  const [userId, setUserId] = useState("")
  const handleClick = () => {
    try {
      login({ userId })
    } catch (e) {
      alert("Failed to login")
      setUserId("")
    }
  }

  const { from } = location.state || { from: { pathname: "/" } }
  if (authenticated) return <Redirect to={from} />

  return (
    <>
      <h1>Login</h1>
      <input
        value={userId}
        onChange={({ target: { value } }) => setUserId(value)}
        type="text"
        placeholder="userId"
      />
      <button onClick={handleClick}>Login</button>
    </>
  );
}

export default LoginForm