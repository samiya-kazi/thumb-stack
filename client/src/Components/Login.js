function Login () {
  return (
    <div className="form-container">
      <form>
        <h1>Login</h1>
        <div>
          <label>E-mail:</label>
          <input type='email' />
        </div>
        <div>
          <label>Password:</label>
          <input type='Password' />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;