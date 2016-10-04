import {
  WS_OPEN, WS_CLOSE, WS_ERROR, PARSE_ERROR, UPDATE_CLIENTS, UPDATE_CLIENT,
  UNKNOWN_MSG, CLIENT_CLOSE,
} from '../actions';
import { arrayReplace } from '../utils';

const initialState = {
  state: 'disconnected',
  viz: null,
  clients: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WS_OPEN:
      return {
        ...state,
        state: 'connected',
        viz: action.viz,
      };

    case WS_CLOSE:
      return {
        ...state,
        state: 'disconnected',
        viz: null,
        clients: [],
        event: action.event,
      };

    case WS_ERROR:
      return {
        ...state,
        state: 'disconnected',
        viz: null,
        clients: [],
        event: action.event,
      };

    case PARSE_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case UPDATE_CLIENTS:
      return {
        ...state,
        clients: action.clients,
      };

    case UPDATE_CLIENT:
      return {
        ...state,
        clients: arrayReplace(state.clients, action.client),
      };

    case CLIENT_CLOSE:
      const client = state.clients.find(i => i.id === action.id);
      return {
        ...state,
        clients: arrayReplace(state.clients, { ...client, closed: true }),
      };

    case UNKNOWN_MSG:
      return {};

    default:
      return state;
  }
};
