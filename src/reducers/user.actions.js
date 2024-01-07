import { createAsyncAction } from "../utils/actionCreators";

export const actions = {
  clearState: createAsyncAction("@user/CLEAR"),
  loadUser: createAsyncAction("@user/LOAD"),
  saveUser: createAsyncAction("@user/SAVE"),
  deleteUser: createAsyncAction("@user/DELETE"),
  getAddress: createAsyncAction("@user/GET_ADDRESS")

};
