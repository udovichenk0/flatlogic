import { createRoute, createRouterControls } from "atomic-router";

export const controls = createRouterControls();

const productRoute = createRoute();
const accountRoute = createRoute();
const homeRoute = createRoute();
const shopRoute = createRoute();
const goToShopRoute = createRoute();
const loginRoute = createRoute();
const registerRoute = createRoute();
const adminRoute = createRoute()

export const goToProductRoute = createRoute();
export const productRoutes = {
  route: productRoute,
};

export const accountRoutes = {
  route: accountRoute,
};

export const homeRoutes = {
  route: homeRoute,
  goToShopRoute,
  goToProductRoute
};

export const shopRoutes = {
  route: shopRoute,
  goToProductRoute
};

export const signInRoutes = {
  route: loginRoute,
};

export const signUpRoutes = {
  route: registerRoute,
};

export const adminRoutes = {
  route: adminRoute
}
