import { put } from "redux-saga/effects";
import { routeWatcher } from "./routes.saga";
import asyncFlow from "./asyncHandler";
import {actions as routeActions, types as routes} from "../reducers/routes.actions";
import { actions } from "../reducers/home.actions";
import { request } from "../utils/api";
import usersMock from "./users.mock";

function* homeRouteWatcher() {
  yield routeWatcher(routes.HOME, function* () {
    yield put(actions.loadUsers.request());
  });
}

const loadUsers = asyncFlow({
  actionGenerator: actions.loadUsers,
  api: () => {
    return request({
      url: `http://localhost:8080/usuarios`,
      method: "get",
    });
  },
  postSuccess: function* ({ response }) {
    console.log({ users: response.data });
  },
});

export const sagas = [homeRouteWatcher(), loadUsers.watcher()];
