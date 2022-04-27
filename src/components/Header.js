import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg'


function Header(props) {
  
  const location = useLocation();
  
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип" className="header__logo" />
      <div className="header__links">
          <p className="header__link header__link_email">
            {location.pathname === "/" ? props.userEmailOnHeader : ""}
          </p>
          <Link to={location.pathname === "/sign-up" ? "/sign-in" : location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"}
            className="header__link header__link_exit"
            onClick={location.pathname === "/" ? props.logoutProfile : () => {}}
          >
            {location.pathname === "/sign-up" ? "Войти" : location.pathname === "/sign-in" ? "Регистрация" : "Выйти"}
          </Link>
        </div>
    </header>
  );
}

export default Header;
