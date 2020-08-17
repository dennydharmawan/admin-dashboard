import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';

import useSharedState from '../lib/hooks/useSharedState';
import useStickyState from '../lib/hooks/useStickyState';
import useLocalStorage from '../lib/hooks/useLocalStorage';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const [darkMode, setDarkMode] = useLocalStorage('darkMode', 'false');
  console.log(darkMode);
  //{/* <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} /> */}

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Wisanggeni Admin</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}
