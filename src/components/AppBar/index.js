import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import DisconnectedIcon from 'material-ui/svg-icons/notification/sync-disabled';

import { toggleDrawer } from '../../core/actions/main';

const AppBarComp = ({ connected, onToggleDrawer }) => {
  let rightElement;
  if (connected) {
    rightElement = (
      <FlatButton
        label="Manage instances"
        labelPosition="before"
        icon={<MenuIcon />}
        onClick={onToggleDrawer}
      />
    );
  } else {
    rightElement = (
      <FlatButton
        label="Disconnected"
        labelPosition="before"
        icon={<DisconnectedIcon />}
        disabled
      />
    );
  }

  return (
    <AppBar
      title="Sosies Visualizer"
      titleStyle={{ height: 48, lineHeight: '48px' }}
      showMenuIconButton={false}
      iconElementRight={rightElement}
      iconStyleRight={{ marginTop: 0 }}
    />
  );
};

AppBarComp.propTypes = {
  connected: React.PropTypes.bool,
  onToggleDrawer: React.PropTypes.func,
};

export default connect(
  () => ({}),
  { onToggleDrawer: toggleDrawer },
)(AppBarComp);
