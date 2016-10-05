import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '../AppBar';

const Layout = ({ connected, children }) => (
  <MuiThemeProvider>
    <div>
      <AppBar connected={connected} />
      <div>
        {children}
      </div>
    </div>
  </MuiThemeProvider>
);

Layout.propTypes = {
  connected: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export default Layout;
