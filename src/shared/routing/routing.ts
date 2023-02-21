import { createRoute, createRouterControls } from "atomic-router";

export const controls = createRouterControls();

const productRoute = createRoute();
const accountRoute = createRoute();
const homeRoute = createRoute();
const shopRoute = createRoute();
const loginRoute = createRoute();
const goToShopRoute = createRoute();

export const productRoutes = {
  route: productRoute,
};

export const accountRoutes = {
  route: accountRoute,
};

export const homeRoutes = {
  route: homeRoute,
  goToShopRoute,
};

export const shopRoutes = {
  route: shopRoute,
};

export const signInRoutes = {
  route: loginRoute,
};

export const goToProductRoute = createRoute();
