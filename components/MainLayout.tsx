import clsx from "clsx";
import React from "react";

import { Checkbox, CssBaseline, Switch } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";

import theme from "../constants/theme";
import useLocalStorage from "../lib/hooks/useLocalStorage";
import { mainListItems, secondaryListItems } from "./ListItem";

const drawerWidth = 240;
const minimizedDrawerWidth = 56;
const gutterLeftMainContent = 12;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
  },
  toolbarGutters: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
  },
  toolbarDense: {
    minHeight: theme.mixins.toolbar.minHeight,
    height: theme.mixins.toolbar.minHeight,
  },
  toolbarText: {
    lineHeight: 'inherit',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    width: minimizedDrawerWidth,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  titleContainer: {
    padding: gutterLeftMainContent,
    marginRight: 'auto',
  },
  titleLogo: {
    padding: '2px 8px 2px 8px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  mainContainer: {
    padding: gutterLeftMainContent,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    height: '100vh',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar
            className={classes.toolbar}
            classes={{
              gutters: classes.toolbarGutters,
              dense: classes.toolbarDense,
            }}
            variant="dense"
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Box className={classes.titleContainer} lineHeight={1.2}>
              <Typography
                className={classes.toolbarText}
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
              >
                Dashboard
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <Paper className={classes.drawerHeader} elevation={4} square={true}>
            <Paper className={classes.titleLogo} variant="outlined">
              <Typography variant="h6" color="primary">
                Wisanggeni
              </Typography>
            </Paper>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </Paper>
          <List disablePadding>{mainListItems}</List>
          <Divider />
          <List disablePadding>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Box className={classes.mainContainer}>{children}</Box>
        </main>
      </ThemeProvider>
    </div>
  );
};

export default MainLayout;
//https://developer.mongodb.com/how-to/nextjs-building-modern-applications
