import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

import { createClients, toggleClient } from '../../../core/actions/main';

const ClientList = ({ clients, onCreateClients, onToggleClient }) => (
  <div>
    <List>
      <Subheader>Disconnected instances</Subheader>
      {clients.map((c, i) => (
        <ListItem
          key={i}
          leftCheckbox={
            <Checkbox
              checked={c.selected || false}
              onCheck={() => onToggleClient(c, !c.selected)}
            />
          }
          primaryText={c.id}
          secondaryText={`Port: ${c.port}`}
        />
      ))}
    </List>
    <Divider />
    <div style={{ paddingTop: 10 }}>
      <RaisedButton
        primary
        fullWidth
        label="Re-create selected instances"
        disabled={!clients.some(c => c.selected)}
        onClick={onCreateClients}
      />
    </div>
  </div>
);

ClientList.propTypes = {
  clients: React.PropTypes.array,
  onToggleClient: React.PropTypes.func,
  onCreateClients: React.PropTypes.func,
};

export default connect(
  state => ({ clients: state.main.clients.filter(c => c.closed) }),
  { onCreateClients: createClients, onToggleClient: toggleClient },
)(ClientList);
