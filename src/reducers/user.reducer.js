import { actions } from "./user.actions";
import { types as routes } from "./routes.actions";

const initialState = {
  id: null,
  data: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case routes.USER:
      return {
        ...initialState,
        id: action.payload.id,
      };
    case actions.getAddress.REQUEST:
      return{
        ...state,
        cep:action.payload
      }
    case actions.getAddress.SUCCESS:
      return {
        ...state,
        address:action.payload.response.data
      }
    case actions.loadUser.REQUEST:
    case actions.loadUser.SUCCESS:
    case actions.loadUser.FAILURE:
      return {
        ...state,
        loading: action.type === actions.loadUser.REQUEST,
        data:
          action.type === actions.loadUser.SUCCESS
            ? action.payload.response.data
            : null,
      };
    case actions.deleteUser.REQUEST:
      return{
        ...state,
        id:action.payload
      }
    case actions.deleteUser.SUCCESS:
    case actions.deleteUser.FAILURE:
    case actions.clearState.REQUEST:
      return{
        id:undefined
      }
    case actions.clearState.SUCCESS:
    case actions.clearState.FAILURE:
    default:
      return state;
  }

};

export default reducer;
