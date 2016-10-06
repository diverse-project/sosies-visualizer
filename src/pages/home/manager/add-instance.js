import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import AutoRenewIcon from 'material-ui/svg-icons/action/autorenew';

import { addClient } from '../../../core/actions/main';
import { randomName } from '../../../core/utils';

class AddInstance extends React.Component {
  static propTypes = {
    onAddClient: React.PropTypes.func,
  };

  static stateTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { name: randomName() };
  }

  doAddClient() {
    this.setState({ name: randomName() });
    this.props.onAddClient(this.state.name);
  }

  render() {
    return (
      <div>
        <p>Add another RingoJS instance that runs MdMS</p>
        <TextField
          hintText={`eg. ${this.state.name}`}
          value={this.state.name}
          floatingLabelText="Instance name"
          onChange={e => this.setState({ name: e.target.value })}
        />
        <IconButton onClick={() => this.setState({ name: randomName() })}>
          <AutoRenewIcon />
        </IconButton>
        <RaisedButton
          primary
          label="Add instance"
          onClick={() => this.doAddClient()}
        />
      </div>
    );
  }
}

export default connect(
  () => ({}),
  { onAddClient: addClient }
)(AddInstance);
