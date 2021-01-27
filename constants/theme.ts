import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// https://material-ui.com/customization/palette/
declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    accent?: {
      main: React.CSSProperties['color'];
      contrastText: React.CSSProperties['color'];
    };
    intermediary?: React.CSSProperties['color'];
  }
}

let theme = createMuiTheme({
  typography: {
    fontFamily: 'Inter, Arial, Helvetica, sans-serif',
  },
  mixins: {
    toolbar: {
      minHeight: '48px',
    },
  },
  palette: {
    primary: {
      main: '#635bff',
      contrastText: '#fff',
    },
    intermediary: '#0048E5',
    secondary: {
      main: '#0a2540',
      contrastText: '#fff',
    },
    accent: {
      main: '#00d4ff',
      contrastText: '#181D1F',
    },
    type: 'light',
  },
});

theme = responsiveFontSizes(theme);

export default theme;
