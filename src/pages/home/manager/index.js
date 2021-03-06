import React from 'react';
import Paper from 'material-ui/Paper';
import { Row, Col } from 'react-flexbox-grid';

import ConnectedClients from './connected-clients';
import DisconnectedClients from './disconnected-clients';
import AddInstance from './add-instance';

import '../styles.css';

const Manager = () => (
  <Row className="row">
    <Col xs={12} className="col">
      <Paper zDepth={1}>
        <div style={{ padding: 10 }}>
          <AddInstance />
        </div>
      </Paper>
    </Col>
    <Col xs={12} className="col">
      <Paper zDepth={1}>
        <div style={{ padding: 10 }}>
          <ConnectedClients />
        </div>
      </Paper>
    </Col>
    <Col xs={12} className="col">
      <Paper zDepth={1}>
        <div style={{ padding: 10 }}>
          <DisconnectedClients />
        </div>
      </Paper>
    </Col>
  </Row>
);

export default Manager;
