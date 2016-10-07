import {
  WS_OPEN, WS_CLOSE, PARSE_ERROR, UPDATE_CLIENTS, UNKNOWN_MSG, UPDATE_CLIENT,
  CLIENT_CLOSE, TOGGLE_CLIENT, NEW_CLIENT, CHANGE_TAB, TOGGLE_ACTIVITY,
  CLIENT_ANSWER, TOGGLE_DRAWER,
} from '.';

export function connect() {
  return (dispatch, getState) => {
    const client = new WebSocket('ws://localhost:9050/viz');
    client.onopen = () => {
      dispatch({ type: WS_OPEN, viz: client });
      client.send(JSON.stringify({ type: 'ALL_DATA' }));
    };

    client.onclose = (event) => {
      dispatch({ type: WS_CLOSE, event });
      setTimeout(() => dispatch(connect()), 2000);
    };

    client.onmessage = (event) => {
      const clients = getState().main.clients;
      try {
        const msg = JSON.parse(event.data);
        switch (msg.type) {
          case 'REGISTER':
            dispatch({
              type: NEW_CLIENT,
              client: {
                id: msg.id,
                port: msg.port,
                ringo: msg.ringo,
              },
            });
            break;

          case 'ALL_DATA':
            dispatch({ type: UPDATE_CLIENTS, clients: msg.clients });
            break;

          case 'DATA':
            let c = clients.find(i => i.id === msg.id);
            if (c) {
              c = { ...c, data: msg.data };
            } else {
              c = { id: msg.id, data: msg.data };
            }
            dispatch({ type: UPDATE_CLIENT, client: c });
            break;

          case 'CLOSE':
            dispatch({
              type: CLIENT_CLOSE,
              client: clients.find(i => i.id === msg.id),
            });
            break;

          case 'ANSWER':
            dispatch({
              type: CLIENT_ANSWER,
              client: clients.find(i => i.id === msg.id),
              url: msg.url,
            });
            break;

          default:
            dispatch({ type: UNKNOWN_MSG, msg });
            break;
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          dispatch({ type: PARSE_ERROR, error });
        } else {
          throw error;
        }
      }
    };
  };
}

export function changeTab(val) {
  return { type: CHANGE_TAB, val };
}

export function toggleDrawer() {
  return { type: TOGGLE_DRAWER };
}

export function toggleClient(client, selected) {
  return { type: TOGGLE_CLIENT, client, selected };
}

export function toggleActivity(client, isActive) {
  return (dispatch, getState) => {
    const viz = getState().main.viz;
    if (viz && viz.readyState === WebSocket.OPEN) {
      viz.send(JSON.stringify({
        type: isActive ? 'ACTIVATE' : 'DEACTIVATE',
        id: client.id,
      }));
      dispatch({ type: TOGGLE_ACTIVITY, client, active: isActive });
    }
  };
}

export function addClient(id, ringo) {
  return (dispatch, getState) => {
    const viz = getState().main.viz;
    if (viz && viz.readyState === WebSocket.OPEN) {
      viz.send(JSON.stringify({ type: 'CREATE', id, ringo }));
    }
  };
}

export function removeClient(id) {
  return (dispatch, getState) => {
    const viz = getState().main.viz;
    if (viz && viz.readyState === WebSocket.OPEN) {
      viz.send(JSON.stringify({ type: 'DELETE', id }));
    }
  };
}

export function deleteClients() {
  return (dispatch, getState) => {
    const { clients } = getState().main;
    clients.filter(c => c.selected && !c.closed)
      .forEach((c) => {
        dispatch(toggleClient(c, false));
        dispatch(removeClient(c.id));
      });
  };
}

export function createClients() {
  return (dispatch, getState) => {
    const { clients } = getState().main;
    clients.filter(c => c.selected && c.closed)
      .forEach((c) => {
        dispatch(toggleClient(c, false));
        dispatch(addClient(c.id));
      });
  };
}
