import { Backdrop, Box, Paper, /*useMediaQuery*/ } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/styles';
import 'leaflet/dist/leaflet.css';
import React, { useMemo } from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import DisplayContext, { useDisplayContext } from './components/DisplayContext';
import QuickMenu from './components/QuickMenu';
import Navigation from './components/Navigation';
import StatusPage from './pages/StatusPage';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';

const useStyles = makeStyles(({
  backdrop: {
    position: 'absolute',
    // z-index: 1050 is just enough to cover the radial menu
    zIndex: 1050,
  },
  container: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1,
  },
  root: {
    width: '100vw',
  },
}));

function AppContent() {
  const styles = useStyles();
  const { brightness, setBrightness } = useDisplayContext();
  const isBackdropVisible = useMemo(() => brightness === 'off', [brightness]);

  function handleBackdropClick() {
    if (brightness === 'off') {
      setBrightness('on');
    }
  }

  return (
    <>
      <Box className={styles.container}>
        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/status">
            <StatusPage />
          </Route>
          <Route path="/map">
            <MapPage />
          </Route>
        </Switch>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1049 }} elevation={3}>
          <Navigation />
        </Paper>
        <QuickMenu />
      </Box>
      <Backdrop className={styles.backdrop} open={isBackdropVisible} onClick={handleBackdropClick} />
    </>
  );
}

export default function App() {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          // mode: prefersDarkMode ? 'dark' : 'light',
          mode: 'light',
        },
      }),
    [/*prefersDarkMode*/],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <DisplayContext>
          <AppContent />
        </DisplayContext>
      </Router>
    </ThemeProvider>
  );
}
