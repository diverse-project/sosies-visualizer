import {
  WS_OPEN, WS_CLOSE, PARSE_ERROR, UPDATE_CLIENTS, UNKNOWN_MSG, UPDATE_CLIENT,
  CLIENT_CLOSE,
} from '.';

export function connect() {
  return (dispatch) => {
    const client = new WebSocket('ws://localhost:9050/viz');
    client.onopen = () => {
      dispatch({ type: WS_OPEN, viz: client });
      client.send(JSON.stringify({ type: 'ALL_DATA' }));
    };

    client.onclose = event => {
      console.log('onclose', event);
      dispatch({ type: WS_CLOSE, event });
      setTimeout(() => dispatch(connect()), 2000);
    };

    client.onmessage = event => {
      try {
        const msg = JSON.parse(event.data);
        switch (msg.type) {
          case 'ALL_DATA':
            console.log('ALL_DATA received', { type: UPDATE_CLIENTS, clients: msg.clients });
            dispatch({ type: UPDATE_CLIENTS, clients: msg.clients });
            break;

          case 'DATA':
            console.log('DATA recevied', {
              type: UPDATE_CLIENT,
              client: { id: msg.id, data: msg.data },
            });
            dispatch({
              type: UPDATE_CLIENT,
              client: { id: msg.id, data: msg.data },
            });
            break;

          case 'CLOSE':
            dispatch({ type: CLIENT_CLOSE, id: msg.id });
            break;

          default:
            dispatch({ type: UNKNOWN_MSG, msg });
            break;
        }
      } catch (error) {
        dispatch({ type: PARSE_ERROR, error });
      }
    };
  };
}
