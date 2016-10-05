import {
  WS_OPEN, WS_CLOSE, PARSE_ERROR, UPDATE_CLIENTS, UNKNOWN_MSG, UPDATE_CLIENT,
  CLIENT_CLOSE, TOGGLE_CLIENT, NEW_CLIENT,
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
            dispatch({ type: NEW_CLIENT, client: { id: msg.id } });
            break;

          case 'ALL_DATA':
            dispatch({ type: UPDATE_CLIENTS, clients: msg.clients });
            break;

          case 'DATA':
            dispatch({
              type: UPDATE_CLIENT,
              client: { id: msg.id, data: msg.data },
            });
            break;

          case 'CLOSE':
            dispatch({
              type: CLIENT_CLOSE,
              client: clients.find(i => i.id === msg.id),
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
          console.error(error.stack);
        }
      }
    };
  };
}

export function toggleClient(client) {
  return { type: TOGGLE_CLIENT, client };
}

export function addClient(id) {
  return (dispatch, getState) => {
    const viz = getState().main.viz;
    if (viz && viz.readyState === WebSocket.OPEN) {
      viz.send(JSON.stringify({ type: 'ADD_INSTANCE', id }));
    }
    dispatch({ type: 'ADDING_CLIENT', id });
  };
}

export function removeClients() {
  return (dispatch) => {
    dispatch({ type: 'REMOVING_CLIENT', name });
  };
}
