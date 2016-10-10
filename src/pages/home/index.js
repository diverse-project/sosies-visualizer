import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { Row, Col } from 'react-flexbox-grid';

import Layout from '../../components/Layout';
import Visualizer from '../../components/Visualizer';

import { connect as doConnect, toggleDrawer, toggleActivity } from '../../core/actions/main';
import Manager from './manager';

import './styles.css';

class HomePage extends React.Component {

  static propTypes = {
    state: React.PropTypes.oneOf(['disconnected', 'connected', 'error']),
    clients: React.PropTypes.array,
    drawerOpen: React.PropTypes.bool,
    doConnect: React.PropTypes.func,
    toggleDrawer: React.PropTypes.func,
    toggleActivity: React.PropTypes.func,
  };

  componentDidMount() {
    this.props.doConnect();
  }

  render() {
    return (
      <Layout connected={this.props.state === 'connected'}>
        <Row className="row">
          {this.props.clients.map((client, i) => (
            <Col key={i} xs={12} sm={6} lg={2} className="col">
              <Visualizer client={client} onToggleActivity={this.props.toggleActivity} />
            </Col>
          ))}
          {this.props.clients.length === 0 &&
            <p style={{ paddingLeft: 10 }}>No client connected yet.</p>}
        </Row>
        <Drawer
          openSecondary
          open={this.props.state === 'connected' && this.props.drawerOpen}
          width={350}
        >
          <AppBar
            title="Manage instances"
            titleStyle={{ height: 48, lineHeight: '48px' }}
            iconStyleLeft={{ marginTop: 0 }}
            iconElementLeft={
              <IconButton onClick={this.props.toggleDrawer}>
                <CloseIcon />
              </IconButton>
            }
          />
          <Manager isActive={this.props.drawerOpen} />
        </Drawer>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    state: state.main.state,
    clients: state.main.clients,
    drawerOpen: state.main.drawerOpen,
  }),
  { toggleDrawer, doConnect, toggleActivity }
)(HomePage);
