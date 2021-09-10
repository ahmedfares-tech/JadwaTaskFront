
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme } from '@material-ui/core/styles';

import Routes from './routes';

import theme1 from './themes/default';



export default function App() {

  const theme = createTheme(theme1);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>

  );
}


