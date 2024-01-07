import { put, select } from "redux-saga/effects";
import { routeWatcher } from "./routes.saga";
import asyncFlow from "./asyncHandler";
import {
  types as routes,
  actions as routeActions,
} from "../reducers/routes.actions";
import { actions } from "../reducers/user.actions";
import { request } from "../utils/api";
import {removeNonDigitsFromString} from "../utils/basic";
import {actions as homeActions} from "../reducers/home.actions";

function* userRouteWatcher() {

  yield routeWatcher(routes.USER, function* () {
    yield put(actions.loadUser.request());
  });
}

function* newRouteWatcher() {
  yield routeWatcher(routes.NEW, function* () {
    yield put(actions.clearState.request());
  });
}



const loadUser = asyncFlow({
  actionGenerator: actions.loadUser,
  transform: function* () {
    const id = yield select((state) => state.user.id);
    return { id };
  },
  api: (values) => {
    return request({
      url: `http://localhost:8080/usuario/${values.id}`,
      method: "get",
    });
  },
  postSuccess: function* ({ response }) {
    console.log({ user: response.data });
  },
});

const saveUser = asyncFlow({
  actionGenerator: actions.saveUser,
  transform: function* (payload) {
    const id = yield select((state) => state.user.id);
    return { id, ...payload };
  },
  api: ({ id, ...values }) => {
    return request({
      url: `http://localhost:8080/atualizar`,
      method: "put",
      body: {id,...values},
    });
  },
  postSuccess: function* () {
    yield put(routeActions.redirectTo(routes.HOME));
  },
});

const deleteUser = asyncFlow({
  actionGenerator: actions.deleteUser,
  transform: function* () {
    const id = yield select((state) => state.user.id);
    return { id };
  },
  api: (values) => {
    return request({
      url: `http://localhost:8080/excluir/${values.id}`,
      method: "delete",
    });
  },
  postSuccess: function* ({ response }) {
    yield put(homeActions.loadUsers.request());
  },
});

const getAddress = asyncFlow({
  actionGenerator: actions.getAddress,
  transform: function* (payload) {
    return { cep:removeNonDigitsFromString(payload) };
  },
  api: ({ cep }) => {
    return request({
      url: `https://viacep.com.br/ws/${cep}/json/`,
      method: "get",
    });
  },
  postSuccess: function* ({ response }) {
    console.log({ address: response.data });

  },
});

export const sagas = [
  userRouteWatcher(),
    newRouteWatcher(),
  loadUser.watcher(),
  saveUser.watcher(),
  deleteUser.watcher(),
  getAddress.watcher()
];
