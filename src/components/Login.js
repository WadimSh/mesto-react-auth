import React from "react";

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3 className="login-form__title">Вход</h3>
      <input className="login-form__input login-form__input_login-email" placeholder="Email" 
        type="email" onChange={handleEmailChange} required />
      <input className="login-form__input login-form__input_login-pass" placeholder="Пароль" 
        type="password" onChange={handlePasswordChange} required />
      <button className="login-form__button" type="submit">Войти</button>
    </form>
  )
}

export default Login;