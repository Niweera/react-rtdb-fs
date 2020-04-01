import * as actions from "../actions/actionTypes";

const initialState = {
  addItem: {
    loading: false,
    error: null
  },
  removeItem: {
    loading: false,
    error: null
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_ITEM_START:
      return {
        ...state,
        addItem: {
          ...state.addItem,
          loading: true
        }
      };

    case actions.ADD_ITEM_SUCCESS:
      return {
        ...state,
        addItem: {
          ...state.addItem,
          loading: false,
          error: false
        }
      };

    case actions.ADD_ITEM_FAIL:
      return {
        ...state,
        addItem: {
          ...state.addItem,
          loading: false,
          error: payload
        }
      };

    case actions.REMOVE_ITEM_START:
      return {
        ...state,
        removeItem: {
          ...state.removeItem,
          loading: true
        }
      };

    case actions.REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        removeItem: {
          ...state.removeItem,
          loading: false,
          error: false
        }
      };

    case actions.REMOVE_ITEM_FAIL:
      return {
        ...state,
        removeItem: {
          ...state.removeItem,
          loading: false,
          error: payload
        }
      };
    default:
      return state;
  }
};
