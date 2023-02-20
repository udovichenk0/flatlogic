import { createRoute, createRouterControls } from "atomic-router";

export const controls = createRouterControls();

export const productRoute = createRoute();
const accountRoute = createRoute();
export const homeRoute = createRoute();

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

export const goToProductRoute = createRoute();
