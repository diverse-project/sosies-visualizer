import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';

import Layout from '../../components/Layout';

import { connect as doConnect, changeTab } from '../../core/actions/main';
import Logs from './logs';
import Manager from './manager';

import './styles.css';

const LOGS_TAB = 0;
const MANAGER_TAB = 1;

class HomePage extends React.Component {

  static propTypes = {
    state: React.PropTypes.oneOf(['disconnected', 'connected', 'error']),
    activeTab: React.PropTypes.number,
    changeTab: React.PropTypes.func,
    doConnect: React.PropTypes.func,
  };

  componentDidMount() {
    this.props.doConnect();
  }

  render() {
    return (
      <Layout connected={this.props.state === 'connected'}>
        <Tabs value={this.props.activeTab}>
          <Tab
            value={LOGS_TAB}
            label="Live Logs"
            onActive={() => this.props.changeTab(LOGS_TAB)}
          >
            <Logs isActive={this.props.activeTab === LOGS_TAB} />
          </Tab>
          <Tab
            value={MANAGER_TAB}
            label="Manage Instances"
            onActive={() => this.props.changeTab(MANAGER_TAB)}
          >
            <Manager isActive={this.props.activeTab === MANAGER_TAB} />
          </Tab>
        </Tabs>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    state: state.main.state,
    activeTab: state.main.activeTab,
  }),
  { changeTab, doConnect }
)(HomePage);
