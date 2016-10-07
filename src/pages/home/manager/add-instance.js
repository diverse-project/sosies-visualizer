import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import AutoRenewIcon from 'material-ui/svg-icons/action/autorenew';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { addClient } from '../../../core/actions/main';
import { randomName } from '../../../core/utils';

const SOSIES = [
  'ringo-replace', 'ringo-delete', 'ringo-replaceNew', 'ringo-add',
];

class AddInstance extends React.Component {
  static propTypes = {
    onAddClient: React.PropTypes.func,
  };

  static stateTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: randomName(),
      selectedSosie: SOSIES[0],
    };
  }

  doAddClient() {
    this.setState({ name: randomName() });
    this.props.onAddClient(this.state.name, this.state.selectedSosie);
  }

  handleChange(value) {
    this.setState({ selectedSosie: value });
  }

  handleChange = (event, index, value) =>
    this.setState({ selectedSosie: value });

  render() {
    return (
      <List>
        <Subheader>Instance creation</Subheader>
        <TextField
          hintText={`eg. ${this.state.name}`}
          value={this.state.name}
          floatingLabelText="Instance name"
          onChange={e => this.setState({ name: e.target.value })}
        />
        <IconButton
          onClick={() => this.setState({ name: randomName() })}
          style={{ padding: 0, width: 32, height: 32, bottom: -6 }}
        >
          <AutoRenewIcon />
        </IconButton>
        <br />
        <SelectField value={this.state.selectedSosie} onChange={this.handleChange}>
          {SOSIES.map((sosie, i) => (
            <MenuItem key={i} value={sosie} primaryText={sosie} />
          ))}
        </SelectField>
        <br />
        <RaisedButton
          primary
          label="Add instance"
          disabled={this.state.name.length === 0}
          onClick={() => this.doAddClient()}
        />
      </List>
    );
  }
}

export default connect(
  () => ({}),
  { onAddClient: addClient }
)(AddInstance);
