import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ConnectedIcon from 'material-ui/svg-icons/notification/sync';
import DisconnectedIcon from 'material-ui/svg-icons/notification/sync-disabled';

const AppBarComp = ({ connected }) => (
  <AppBar
    title="Sosies Visualizer"
    titleStyle={{ height: 48, lineHeight: '48px' }}
    showMenuIconButton={false}
    iconElementRight={
      <FlatButton
        label={connected ? 'Connected' : 'Disconnected'}
        labelPosition="before"
        icon={connected ? <ConnectedIcon /> : <DisconnectedIcon />}
        disabled
        style={{ marginTop: 0 }}
      />
    }
  />
);

AppBarComp.propTypes = {
  connected: React.PropTypes.bool,
};

export default AppBarComp;
