import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosSunny, IoMdMoon } from 'react-icons/io';
import { RiMenu3Line } from 'react-icons/ri';
import './index.sass';
import Logo from '../../assets/svg/logo.svg';
import LogoDark from '../../assets/svg/logo_dark.svg';

export const Header = (props) => {
  const { isDark, toggleTheme } = props;
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [showNavigation, setShowNavigation] = useState(!showMenuButton);

  function checkWindowWidth() {
    if (window.innerWidth < 500 && !showMenuButton) {
      setShowMenuButton(true);
    } else if (showMenuButton) {
      setShowMenuButton(false);
    }
  }

  function toggleNavMenu() {
    setShowNavigation(!showNavigation);
  }

  // useEffect(() => {
  //   window.addEventListener('resize', checkWindowWidth);

  //   return () => window.removeEventListener('resize', checkWindowWidth);
  // });

  return (
    <header className="header">
      <a href="." className="header__logo-wrapper">
        <img src={isDark ? LogoDark : Logo} alt="logo" />
        DSOCIETY
      </a>

      {/* {showMenuButton && (
        <button className="header__menu-button" onClick={toggleNavMenu}>
          <RiMenu3Line size="100%" color="var(--color)" />
        </button>
      )} */}

      <ul className={`header__link-list`}>
        <li>
          <Link to="/" className="header__link">
            ГЛАВНАЯ
          </Link>
        </li>
        <li>
          <Link to="/contacts" className="header__link">
            КОНТАКТЫ
          </Link>
        </li>
      </ul>

      <button className="header__theme-btn" onClick={toggleTheme}>
        {isDark ? (
          <IoIosSunny size="100%" color="var(--color)" />
        ) : (
          <IoMdMoon size="100%" color="var(--color)" />
        )}
      </button>
    </header>
  );
};
