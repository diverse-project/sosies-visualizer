import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

import { toggleActivity } from '../../../core/actions/main';

const LoadBalancer = ({ clients, onToggleActivity }) => (
  <div>
    <List>
      <Subheader>Load balancer activity</Subheader>
      {clients.map((c, i) => (
        <ListItem
          key={i}
          primaryText={`${c.id} - ${c.port}`}
          rightToggle={
            <Toggle
              toggled={c.active}
              disabled={c.closed}
              onToggle={() => onToggleActivity(c, !c.activity)}
            />
          }
        />
      ))}
    </List>
  </div>
);

LoadBalancer.propTypes = {
  clients: React.PropTypes.array,
  onToggleActivity: React.PropTypes.func,
};

export default connect(
  state => ({ clients: state.main.clients }),
  { onToggleActivity: toggleActivity },
)(LoadBalancer);
