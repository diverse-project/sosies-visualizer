import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

import { deleteClients, toggleClient } from '../../../core/actions/main';

const ClientList = ({ clients, onDeleteClients, onToggleClient }) => (
  <div>
    <List>
      <Subheader>Connected instances</Subheader>
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
        secondary
        fullWidth
        label="Delete selected instances"
        disabled={!clients.some(c => c.selected)}
        onClick={onDeleteClients}
      />
    </div>
  </div>
);

ClientList.propTypes = {
  clients: React.PropTypes.array,
  onDeleteClients: React.PropTypes.func,
  onToggleClient: React.PropTypes.func,
};

export default connect(
  state => ({ clients: state.main.clients.filter(c => !c.closed) }),
  { onDeleteClients: deleteClients, onToggleClient: toggleClient },
)(ClientList);
