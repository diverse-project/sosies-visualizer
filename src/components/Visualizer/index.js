import React from 'react';
import { Card, CardHeader, CardMedia, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import FunctionsIcon from 'material-ui/svg-icons/editor/functions';

const Visualizer = ({ id, data = Visualizer.defaultPropValues.data, closed }) => (
  <Card>
    <CardHeader title={id} />
    <List style={{ marginBottom: 76 }}>
      {Object.keys(data.functions).map((name, i) => (
        <ListItem
          key={i}
          primaryText={name}
          secondaryText={`Usage: ${data.functions[name]}`}
          leftIcon={<FunctionsIcon />} />
      ))}
    </List>
    {closed && <CardMedia overlay={<CardTitle title="Inactive" />} />}
  </Card>
);

Visualizer.propTypes = {
  id: React.PropTypes.string,
  data: React.PropTypes.object,
  closed: React.PropTypes.bool,
};

Visualizer.defaultPropValues = {
  data: { functions: {} },
  closed: false,
};

export default Visualizer;
