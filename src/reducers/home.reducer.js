import { actions } from "./home.actions";

const initialState = {
  data: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.loadUsers.REQUEST:
    case actions.loadUsers.SUCCESS:
      return {
        ...state,
        loading: action.type === actions.loadUsers.REQUEST,
        data:
            action.type === actions.loadUsers.SUCCESS
                ? action.payload.response.data
                : [],
      };
    case actions.loadUsers.FAILURE:
      return {
        ...state,
        loading: action.type === actions.loadUsers.REQUEST,
        data:
          action.type === actions.loadUsers.SUCCESS
            ? action.payload.response.data
            : [],
      };
    default:
      return state;
  }
};

export default reducer;
