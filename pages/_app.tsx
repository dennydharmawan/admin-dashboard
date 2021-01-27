import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { processEnv } from "next/dist/lib/load-env-config";
import { useEffect } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "../constants/theme";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <DefaultSeo
        titleTemplate={'%s | Wisanggeni Admin'}
        description="An admin app for wisanggeni squad"
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: process.env.SITE,
          site_name: 'Wisanggeni Admin',
        }}
      />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
