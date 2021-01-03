import {
  GET_DATA,
  GET_VILLAGERS,
  GET_ITEMS,
  GET_DATA_BY_ID,
  CLEAR_STATE,
  SET_LOADING,
  SEARCH_BY_HOME_INPUT,
  FILTER_VILLAGERS,
  FILTER_ITEMS,
  FILTER_DIY,
  CLEAR_FILTER,
  CALC_PAGES,
  CALC_PAGES_HOME_INPUT,
  CALC_FILTERED_PAGES,
  CLEAR_ITEMS_FILTER,
  CLEAR_CLOTHES_FILTER,
  GET_CLOTHES,
  GET_DIY,
  GET_SOURCE,
  CLEAR_DIY_FILTER,
  GET_IMG_BY_NAME,
  GET_MAT_IMG_BY_NAME,
  GET_VILLAGER_ITEMS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        allData: action.payload,
        loading: false,
      };
    case GET_VILLAGERS:
      return {
        ...state,
        villagers: action.payload,
        loading: false,
      };

    case GET_ITEMS:
      return {
        ...state,
        items: action.payload.filter(item => {
          return !item.hasOwnProperty('mannequinPiece');
        }),
        loading: false,
      };

    case GET_CLOTHES:
      return {
        ...state,
        items: action.payload.filter(item => {
          return item.hasOwnProperty('mannequinPiece');
        }),
        loading: false,
      };

    case GET_DIY:
      return {
        ...state,
        diy: action.payload,
        loading: false,
      };

    case GET_VILLAGER_ITEMS:
      return {
        ...state,
        vilItmImg: action.payload,
        loading: false,
      };
    case GET_SOURCE:
      return {
        ...state,
        src: action.payload,
        loading: false,
      };

    case SEARCH_BY_HOME_INPUT:
      return {
        ...state,
        homeInput: state.allData.filter(item => {
          return item.name.toLowerCase().match(action.payload);
        }),
        loading: false,
      };

    case FILTER_VILLAGERS:
      return {
        ...state,
        filtered: state.villagers.filter(villager => {
          return villager.name.toLowerCase().match(action.payload);
        }),
        loading: false,
      };

    case FILTER_ITEMS:
      return {
        ...state,
        filtered: state.items.filter(item => {
          return item.name.toLowerCase().match(action.payload);
        }),
        loading: false,
      };

    case FILTER_DIY:
      return {
        ...state,
        filtered: state.diy.filter(item => {
          return item.name.toLowerCase().match(action.payload);
        }),
        loading: false,
      };

    case GET_DATA_BY_ID:
      return {
        ...state,
        dataById: action.payload,
        loading: false,
      };

    case GET_IMG_BY_NAME:
      return {
        ...state,
        diyImg: action.payload,
        loading: false,
      };

    case GET_MAT_IMG_BY_NAME:
      return {
        ...state,
        matArr: action.payload,
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case CALC_FILTERED_PAGES:
      return {
        ...state,
        noOfPages: Math.ceil(state.filtered.length / 16),
      };

    case CALC_PAGES:
      return {
        ...state,
        noOfPages: Math.ceil(state.items.length / 16),
      };

    case CALC_PAGES_HOME_INPUT:
      return {
        ...state,
        noOfPages: Math.ceil(state.homeInput.length / 16),
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: [],
        noOfPages: 25,
      };

    case CLEAR_ITEMS_FILTER:
      return {
        ...state,
        filtered: [],
        noOfPages: 202,
      };

    case CLEAR_CLOTHES_FILTER:
      return {
        ...state,
        filtered: [],
        noOfPages: 70,
      };

    case CLEAR_DIY_FILTER:
      return {
        ...state,
        filtered: [],
        noOfPages: 39,
      };

    case CLEAR_STATE:
      return {
        ...state,
        villagers: [],
        items: [],
        filtered: [],
        homeInput: [],
        diy: [],
        diyImg: '',
        vilItmImg: [],
        dataById: [],
        matArr: [],
        noOfPages: 1,
        loading: false,
      };

    default:
      return { ...state };
  }
};
