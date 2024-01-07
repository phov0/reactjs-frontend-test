import React from "react";
import { useSelector } from "react-redux";
import { connectRoutes, NOT_FOUND } from "redux-first-router";
import * as Pages from "./business/pages";
import { types as routes } from "./reducers/routes.actions";

const routePages = {
  [routes.HOME]: Pages.HomePage,
  [routes.USER]: Pages.UserPage,
  [routes.NEW]: Pages.UserPage,

  [NOT_FOUND]: Pages.HomePage,
};

const routePaths = {
  [routes.HOME]: "/",
  [routes.USER]: "/user/:id",
  [routes.NEW]: "/new",
};

const { reducer, middleware, enhancer } = connectRoutes(routePaths, {
  basename: process.env.REACT_APP_BASE_CONTEXT,
});

export { reducer, middleware, enhancer };

const Container = () => {
  const routeCode = useSelector((state) => state.location.type);
  const Route = routePages[routeCode] ?? routePages[NOT_FOUND];

  return <Route />;
};

export default Container;
