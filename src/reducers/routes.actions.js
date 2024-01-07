import { createSyncAction } from "../utils/actionCreators";

export const types = {
  HOME: "@@routes/home",
  USER: "@@routes/user",
  NEW: "@@routes/new",
};

export const actions = {
  redirectTo: (route, params = {}) => createSyncAction(route, params),
};
