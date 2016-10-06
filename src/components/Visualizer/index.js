import React from 'react';
import { Card, CardHeader, CardMedia, CardTitle } from 'material-ui/Card';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';

const HEIGHT = 24;
const rowStyle = { height: HEIGHT };
const colStyle = {
  height: HEIGHT,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  paddingRight: 10,
};

const renderName = name => name.substr(name.lastIndexOf('.') + 1);

const Visualizer = ({ id, port, data, closed }) => (
  <Card>
    <CardHeader
      title={`${id} - ${port}`}
      subtitle={!data && 'No data yet'}
    />
    <Table height="250px">
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow style={rowStyle}>
          <TableHeaderColumn style={colStyle}>Function name</TableHeaderColumn>
          <TableHeaderColumn style={{ ...colStyle, textAlign: 'right' }}>Usage count</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {data && data.functions && Object.keys(data.functions).map((name, i) => (
          <TableRow key={i} style={rowStyle}>
            <TableRowColumn style={{ ...colStyle, width: '70%' }} title={name}>
              {renderName(name)}
            </TableRowColumn>
            <TableRowColumn style={{ ...colStyle, width: '30%', textAlign: 'right' }}>{data.functions[name]}</TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    {closed && <CardMedia overlay={<CardTitle title="Disconnected" />} />}
  </Card>
);


Visualizer.propTypes = {
  id: React.PropTypes.string,
  port: React.PropTypes.string,
  data: React.PropTypes.object,
  closed: React.PropTypes.bool,
};

export default Visualizer;
