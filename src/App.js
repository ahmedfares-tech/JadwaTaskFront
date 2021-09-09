import { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme } from '@material-ui/core/styles';

import Routes from './routes';

import theme1 from './themes/default';



export default function App() {
  if (localStorage.getItem('mode') === null) {
    localStorage.setItem('mode', false);
  }
  const [darkMode, setDarkMode] = useState(localStorage.getItem('mode'));


  const theme = createTheme(theme1({ darkMode }));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>

  );
}


