import { Link } from 'react-router-dom';
import { IoIosSunny, IoMdMoon } from 'react-icons/io';
import './index.sass';
import Logo from '../../assets/svg/logo.svg';
import LogoDark from '../../assets/svg/logo_dark.svg';

export const Header = (props) => {
  const { isDark, toggleTheme } = props;

  return (
    <header className="header">
      <a href="." className="header__logo-wrapper">
        <img src={isDark ? LogoDark : Logo} alt="logo" />
        DSOCIETY
      </a>

      <ul className="header__link-list">
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
