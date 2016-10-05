import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Row, Col } from 'react-flexbox-grid/lib/index';

import Layout from '../../components/Layout';
import Visualizer from '../../components/Visualizer';

import { connect as doConnect } from '../../core/actions/main';
import Manager from './manager';

import './styles.css';

class HomePage extends React.Component {

  static propTypes = {
    state: React.PropTypes.oneOf(['disconnected', 'connected', 'error']),
    clients: React.PropTypes.array,
    dispatch: React.PropTypes.func,
  };

  componentDidMount() {
    this.props.dispatch(doConnect());
  }

  render() {
    return (
      <Layout connected={this.props.state === 'connected'}>
        <Tabs>
          <Tab label="Live Logs" >
            <Row className="row">
              {this.props.clients.map((client, i) => (
                <Col key={i} xs={12} sm={6} lg={2} className="col">
                  <Visualizer {...client} />
                </Col>
              ))}
              {this.props.clients.length === 0 &&
                <p style={{ paddingLeft: 10 }}>No client connected yet.</p>}
            </Row>
          </Tab>
          <Tab label="Manage Instances" >
            <Manager />
          </Tab>
        </Tabs>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    state: state.main.state,
    clients: state.main.clients,
  })
)(HomePage);
