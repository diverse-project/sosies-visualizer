import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid/lib/index';

import Visualizer from '../../../components/Visualizer';

class Logs extends React.Component {

  static propTypes = {
    isActive: React.PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    clients: React.PropTypes.array,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.isActive;
  }

  render() {
    return (
      <Row className="row">
        {this.props.clients.map((client, i) => (
          <Col key={i} xs={12} sm={6} lg={2} className="col">
            <Visualizer {...client} />
          </Col>
        ))}
        {this.props.clients.length === 0 &&
          <p style={{ paddingLeft: 10 }}>No client connected yet.</p>}
      </Row>
    );
  }
}

export default connect(
  state => ({ clients: state.main.clients }),
)(Logs);
