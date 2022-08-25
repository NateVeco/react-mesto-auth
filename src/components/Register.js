import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleUserEmailChange(e) {
    setEmail(e.target.value);
  };

  function handleUserPasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({email, password});
  };

  return (
    <div className="popup__auth">
      <h2 className="popup__auth-title">Регистрация</h2>
      <form className="popup__auth-form" onSubmit={handleSubmit}>
        <input
          className="popup__auth-input"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleUserEmailChange}
          required
        />
        <input
          className="popup__auth-input"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handleUserPasswordChange}
          required
        />
        <button className="popup__auth-button-submit button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="popup__auth-sign-in">
        <p className="popup__auth-text">
          Уже зарегистрированы?
          <Link to="/signin" className="popup__auth-login">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
