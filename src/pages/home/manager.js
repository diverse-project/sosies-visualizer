import React from 'react';
import Paper from 'material-ui/Paper';
import { Row, Col } from 'react-flexbox-grid';

import ClientList from './client-list';
import AddInstance from './add-instance';

import './styles.css';

const Manager = () => (
  <Row className="row">
    <Col xs={12} sm={6} lg={3} className="col">
      <Paper zDepth={1}>
        <div style={{ padding: 10 }}>
          <ClientList />
        </div>
      </Paper>
    </Col>
    <Col xs={12} sm={6} lg={3} className="col">
      <Paper zDepth={1}>
        <div style={{ padding: 10 }}>
          <AddInstance />
        </div>
      </Paper>
    </Col>
  </Row>
);

Manager.propTypes = {};

export default Manager;
