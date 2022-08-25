import React from "react";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleUserEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleUserPasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  return (
    <div className="popup__auth" onSubmit={handleSubmit}>
      <h2 className="popup__auth-title">Вход</h2>
      <form className="popup__auth-form" onSubmit={handleSubmit}>
        <input
          className="popup__auth-input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleUserEmailChange}
          required
        />
        <input
          className="popup__auth-input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={handleUserPasswordChange}
          required
        />
        <button className="popup__auth-button-submit button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
