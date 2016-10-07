import React from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';

import RequestList from '../RequestList';

const HEIGHT = 24;
const rowStyle = { height: HEIGHT };
const colStyle = {
  height: HEIGHT,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  paddingRight: 10,
};
const cardHeaderStyle = {
  display: 'inline-block',
  paddingTop: 10,
  paddingLeft: 10,
};
const titleStyle = {
  color: 'rgba(0, 0, 0, 0.870588)',
  display: 'block',
  fontSize: 15,
};
const subtitleStyle = {
  color: 'rgba(0, 0, 0, 0.541176)',
  display: 'block',
  fontSize: 12,
};
const toggleStyle = {
  display: 'inline-block',
  float: 'right',
  width: 'auto',
  paddingTop: 10,
  paddingRight: 10,
};

const renderName = name => name.substr(name.lastIndexOf('.') + 1);

const Visualizer = ({ client, onToggleActivity }) => (
  <Card>
    <div style={cardHeaderStyle}>
      <span style={titleStyle}>{client.id}</span>
      <span style={subtitleStyle}>{`Port: ${client.port}`}</span>
      <span style={subtitleStyle}>{`Sosie: ${client.ringo}`}</span>
    </div>
    <Toggle
      title="Answer requests"
      toggled={client.active || false}
      disabled={client.closed || false}
      onToggle={() => onToggleActivity(client, !client.active)}
      style={toggleStyle}
    />
    <Table height="300px" wrapperStyle={{ width: '100%' }}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow style={rowStyle}>
          <TableHeaderColumn style={colStyle}>Function name</TableHeaderColumn>
          <TableHeaderColumn style={{ ...colStyle, textAlign: 'right' }}>Usage count</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {client.data && client.data.functions &&
          Object.keys(client.data.functions).map((name, i) => (
            <TableRow key={i} style={rowStyle}>
              <TableRowColumn style={{ ...colStyle, width: '70%' }} title={name}>
                {renderName(name)}
              </TableRowColumn>
              <TableRowColumn
                style={{ ...colStyle, width: '30%', textAlign: 'right' }}
              >{client.data.functions[name]}</TableRowColumn>
            </TableRow>
          ))}
      </TableBody>
    </Table>
    <RequestList requests={client.requests} />
    {client.closed && <CardMedia overlay={<CardTitle title="Disconnected" />} />}
  </Card>
);


Visualizer.propTypes = {
  client: React.PropTypes.object,
  onToggleActivity: React.PropTypes.func,
};

export default Visualizer;
