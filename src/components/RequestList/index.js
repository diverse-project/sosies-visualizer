import React from 'react';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';

const HEIGHT = 24;
const rowStyle = { height: HEIGHT };
const colStyle = {
  height: HEIGHT,
  paddingTop: 2,
  paddingBottom: 2,
  paddingLeft: 10,
  paddingRight: 10,
};

const RequestList = ({ requests = [] }) => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow style={rowStyle}>
        <TableHeaderColumn style={colStyle}>Answered requests (10 latest)</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {requests.map((request, i) => (
        <TableRow key={i} style={rowStyle}>
          <TableRowColumn style={{ ...colStyle }}>
            {request}
          </TableRowColumn>
        </TableRow>
      ))}
      {requests.length === 0 && (
        <TableRow style={rowStyle}>
          <TableRowColumn style={{ ...colStyle }}>
            <em>No request logged yet</em>
          </TableRowColumn>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

RequestList.propTypes = {
  requests: React.PropTypes.array,
};

export default RequestList;
