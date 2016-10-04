import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '../AppBar';

import './styles.css';

class Layout extends React.Component {

  static propTypes = {
    connected: React.PropTypes.bool,
    children: React.PropTypes.node,
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar connected={this.props.connected} />
          <div className="content">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout;
