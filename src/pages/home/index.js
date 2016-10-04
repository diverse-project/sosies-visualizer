import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid/lib/index';

import Layout from '../../components/Layout';
import Visualizer from '../../components/Visualizer';

import { connect as doConnect } from '../../core/actions/main';

const PADDING = 10;

class HomePage extends React.Component {

  static propTypes = {
    viz: React.PropTypes.object,
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
        <Row style={{ paddingLeft: PADDING, paddingRight: PADDING }}>
          {this.props.clients.map((client, i) => (
            <Col key={i} xs={12} sm={6} lg={2} style={{ padding: PADDING }}>
              <Visualizer {...client} />
            </Col>
          ))}
          {this.props.clients.length === 0 && <p>No client connected yet.</p>}
        </Row>
      </Layout>
    );
  }
}

export default connect(
  state => ({ ...state.main })
)(HomePage);
