import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

import { removeClients, toggleClient } from '../../core/actions/main';

const ClientList = ({ clients, onRemoveClients, onToggleClient }) => (
  <div>
    <List>
      <Subheader>Connected instances</Subheader>
      {clients.filter(c => !c.closed).map((c, i) => (
        <ListItem
          key={i}
          leftCheckbox={<Checkbox onCheck={() => onToggleClient(c)} />}
          primaryText={c.id}
        />
      ))}
    </List>
    <Divider />
    <List>
      <Subheader>Disconnected instances</Subheader>
      {clients.filter(c => c.closed).map((c, i) => (
        <ListItem
          key={i}
          leftCheckbox={<Checkbox onCheck={() => onToggleClient(c)} />}
          primaryText={c.id}
        />
      ))}
    </List>
    <Divider />
    <div style={{ paddingTop: 10 }}>
      <RaisedButton
        secondary
        fullWidth
        label="Delete selected instances"
        onClick={onRemoveClients}
      />
    </div>
  </div>
);

ClientList.propTypes = {
  clients: React.PropTypes.array,
  onRemoveClients: React.PropTypes.func,
  onToggleClient: React.PropTypes.func,
};

export default connect(
  state => ({ clients: state.main.clients }),
  { onRemoveClients: removeClients, onToggleClient: toggleClient },
)(ClientList);
