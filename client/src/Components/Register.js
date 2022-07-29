
function Register () {
  return (
    <div className="form-container">
      <form>
        <h1>Register</h1>
        <div>
          <label>First Name:</label>
          <input type='text' name="firstName" />
        </div>
        <div>
          <label>Last Name:</label>
          <input type='text' name="lastName" />
        </div>
        <div>
          <label>E-mail:</label>
          <input type='email' name="email"/>
        </div>
        <div>
          <label>Password:</label>
          <input type='password' name="password" />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type='password' name="confirmPassword" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register;