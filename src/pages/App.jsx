import { useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Home } from './Home';
import { Contacts } from './Contacts';

export const App = () => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const localStorageTheme = window.localStorage.getItem('theme');
  // check local storage theme
  // if have then will set storage theme
  // else will set user's browser theme
  const darkThemeIsActive = localStorageTheme ? localStorageTheme === 'dark' : prefersDarkScheme.matches;
  const [isDark, setIsDark] = useState(darkThemeIsActive);

  return (
    <div className={`App ${isDark ? '' : 'light'}`}>
      <div className="App__body-wrapper">
        <HashRouter>
          <Header isDark={isDark} toggleTheme={toggleTheme} />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contacts" component={Contacts} />
          </Switch>

          <Footer />
        </HashRouter>
      </div>
    </div>
  );

  function toggleTheme() {
    const theme = isDark ? 'light' : 'dark';

    setIsDark(!isDark);
    localStorage.setItem('theme', theme);
  }
};
