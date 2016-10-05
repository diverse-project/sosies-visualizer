import React from 'react';
import { Card, CardHeader, CardMedia, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import FunctionsIcon from 'material-ui/svg-icons/editor/functions';

const Visualizer = ({ id, data, closed }) => (
  <Card>
    <CardHeader
      title={id}
      subtitle={!data && 'No data available'}
    />
    <List style={{ marginBottom: 76 }}>
      {data && data.functions && Object.keys(data.functions).map((name, i) => (
        <ListItem
          key={i}
          primaryText={name}
          secondaryText={`Usage: ${data.functions[name]}`}
          leftIcon={<FunctionsIcon />}
        />
      ))}
    </List>
    {closed && <CardMedia overlay={<CardTitle title="Disconnected" />} />}
  </Card>
);

Visualizer.propTypes = {
  id: React.PropTypes.string,
  data: React.PropTypes.object,
  closed: React.PropTypes.bool,
};

export default Visualizer;
