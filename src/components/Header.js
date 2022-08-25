// import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../images/Logo.svg";

function Header({ userEmail, onLogout }) {
  return (
    <header className="header">
        <img className="header__logo" src={logo} alt="логотип" />
       <div className="header__menu">
        <Route exact path="/">
          <p className="header__link">{userEmail}</p>
          <a className="header__link" onClick={onLogout}>
            Выйти
          </a>
        </Route>

        <Route path="/signin">
          <Link to="/signup" className="header__link">
            Регистрация
          </Link>
        </Route>

        <Route path="/signup">
          <Link to="/signin" className="header__link">
            Войти
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
