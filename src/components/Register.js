import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(email, password);
  }

  return(
    <form className="login-form" onSubmit={handleSubmit}>
      <h3 className="login-form__title">Регистрация</h3>
      <input className="login-form__input login-form__input_login-email" placeholder="Email" 
        type="email" onChange={handleEmailChange} required />
      <input className="login-form__input login-form__input_login-pass" placeholder="Пароль" 
        type="password" onChange={handlePasswordChange} required/>
      <button className="login-form__button" type="submit">Зарегистрироваться</button>
      <div className="login-form__text">
        Уже зарегистрированы? 
        <Link to="/sign-in" className="login-form__link">Войти</Link>
      </div>
    </form>
  )
}

export default Register;