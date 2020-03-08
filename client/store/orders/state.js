import { cloneDeep } from "lodash";
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  ADD_TO_CART,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  SET_SHIPPING_ADDRESS,
  SET_DELIVERY_METHOD,
  EMPTY_CART,
  REMOVE_FROM_CART,
  AUTO_INIT_ORDERS,
  DESTROY,
  GET_CUSTOMER_ORDERS_REQUEST,
  GET_CUSTOMER_ORDERS_SUCCESS,
  GET_CUSTOMER_ORDERS_FAILURE
} from "./actionTypes";

export const initialState = {
  list: [],
  isDrawerOpen: false,
  cartItemsCount: 0,
  order: {
    orderedGames: [
      // {
      //   count: 1,
      //   gameId: "",
      //   name: "Riziko",
      //   price: "22"
      // },
    ],
    totalPrice: "0",
    deliveryType: "",
    shippingAddress: ""
  },
  error: null,
  loading: false
};

const _addToCart = (state, action) => {
  const clonedState = cloneDeep(state);
  const gamesArray = clonedState.order.orderedGames;
  const gameIndex = gamesArray.findIndex(
    game => game._id === action.payload._id
  );
  const transformedGame = {
    _id: action.payload._id,
    gameId: action.payload._id,
    name: action.payload.name,
    price: action.payload.price,
    count: 1
  };

  if (gameIndex === -1) {
    gamesArray.push(transformedGame);
  } else {
    gamesArray[gameIndex].count++;
    gamesArray[gameIndex].price = String(
      Number(gamesArray[gameIndex].price) + Number(transformedGame.price)
    );
  }
  clonedState.order.totalPrice = String(
    Number(clonedState.order.totalPrice) + Number(transformedGame.price)
  );
  return {
    transformedList: gamesArray,
    totalPrice: clonedState.order.totalPrice
  };
};

const _removeFromCart = (state, action) => {
  const gamesArray = cloneDeep(state.order.orderedGames);
  const gameIndex = gamesArray.findIndex(
    game => game._id === action.payload._id
  );
  gamesArray[gameIndex].price = String(
    Number(gamesArray[gameIndex].price) - Number(action.payload.price)
  );
  if (gamesArray[gameIndex].count === 1) {
    gamesArray.splice(gameIndex, 1);
  } else {
    gamesArray[gameIndex].count--;
  }
  const updatedPrice = String(
    Number(state.order.totalPrice) - Number(action.payload.price)
  );

  return {
    filteredList: gamesArray,
    updatedPrice
  };
};

const _setDeliveryMethod = (state, action) => {
  let totalPrice = state.order.totalPrice;
  const oldDeliveryType = state.order.deliveryType;
  const { method, by } = action.payload;

  if (method === "fast") {
    totalPrice = String(Number(totalPrice) + Number(by));
  } else if (method === "regular") {
    if (oldDeliveryType === "fast") {
      totalPrice = String(Number(totalPrice) + Number(by));
    }
  }
  return totalPrice;
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTO_INIT_ORDERS:
      return {
        ...state,
        ...action.payload
      };
    case ADD_TO_CART:
      const { transformedList, totalPrice } = _addToCart(state, action);
      return {
        ...state,
        cartItemsCount: state.cartItemsCount + 1,
        order: {
          ...state.order,
          orderedGames: [...transformedList],
          totalPrice
        }
      };
    case REMOVE_FROM_CART:
      const { filteredList, updatedPrice } = _removeFromCart(state, action);
      return {
        ...state,
        cartItemsCount: state.cartItemsCount - 1,
        order: {
          ...state.order,
          orderedGames: [...filteredList],
          totalPrice: updatedPrice
        }
      };
    case SET_SHIPPING_ADDRESS:
      return {
        ...state,
        order: {
          ...state.order,
          shippingAddress: action.payload
        }
      };
    case SET_DELIVERY_METHOD:
      const newPrice = _setDeliveryMethod(state, action);
      return {
        ...state,
        order: {
          ...state.order,
          deliveryType: action.payload.method,
          totalPrice: newPrice
        }
      };
    case EMPTY_CART:
      return initialState;
    case OPEN_DRAWER:
      return {
        ...state,
        isDrawerOpen: true
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        isDrawerOpen: false
      };
    case GET_ORDERS_REQUEST:
    case CREATE_ORDER_REQUEST:
    case GET_CUSTOMER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_ORDERS_SUCCESS:
    case GET_CUSTOMER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        list: [...action.payload]
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        order: initialState.order,
        list: [...state.list, action.payload]
      };

    case GET_ORDERS_FAILURE:
    case CREATE_ORDER_FAILURE:
    case GET_CUSTOMER_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DESTROY:
      return initialState;
    default:
      return state;
  }
};
