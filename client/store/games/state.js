import { isEmpty } from "lodash";

import {
  LOAD_GAMES_REQUEST,
  LOAD_GAMES_SUCCESS,
  LOAD_GAMES_FAILURE,
  CREATE_GAME_REQUEST,
  CREATE_GAME_SUCCESS,
  CREATE_GAME_FAILURE,
  SEARCH_GAMES_REQUEST,
  SEARCH_GAMES_SUCCESS,
  SEARCH_GAMES_FAILURE,
  REMOVE_GAME_REQUEST,
  REMOVE_GAME_SUCCESS,
  REMOVE_GAME_FAILURE,
  GET_GAME_REQUEST,
  GET_GAME_SUCCESS,
  GET_GAME_FAILURE,
  UPDATE_GAME_REQUEST,
  UPDATE_GAME_SUCCESS,
  UPDATE_GAME_FAILURE
} from "./actionTypes";

export const initialState = {
  list: [],
  game: {},
  error: null,
  loading: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAMES_REQUEST:
    case SEARCH_GAMES_REQUEST:
    case REMOVE_GAME_REQUEST:
    case CREATE_GAME_REQUEST:
    case GET_GAME_REQUEST:
    case UPDATE_GAME_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOAD_GAMES_SUCCESS:
    case SEARCH_GAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        list: [...action.payload]
      };
    case REMOVE_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        list: state.list.filter(game => game._id !== action.payload)
      };
    case CREATE_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        list: [...state.list, action.payload]
      };
    case GET_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        game: { ...action.payload }
      };
    case UPDATE_GAME_SUCCESS:
      let updatedGameList = [];
      if (!isEmpty(state.list)) {
        const gameIndex = state.list.findIndex(
          game => game._id === action.payload._id
        );
        updatedGameList = [...state.list];
        updatedGameList[gameIndex] = { ...action.payload };
      } else {
        updatedGameList = [action.payload];
      }

      return {
        ...state,
        loading: false,
        error: null,
        game: { ...action.payload },
        list: [...updatedGameList]
      };
    case LOAD_GAMES_FAILURE:
    case SEARCH_GAMES_FAILURE:
    case REMOVE_GAME_FAILURE:
    case GET_GAME_FAILURE:
    case UPDATE_GAME_FAILURE:
    case CREATE_GAME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
