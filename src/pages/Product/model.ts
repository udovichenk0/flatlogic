import { productModel } from "@/entities/product";
import { controls } from "@/shared/routing";
import { MainLayout } from "@/widgets/Layouts/main-layout";
import { createRoute, createRouterControls, querySync } from "atomic-router";
import { createEvent, createStore, sample } from "effector";
import { debounce, debug } from "patronum";
import { lazy } from "react";
const ProductLazy = lazy(() => import("./ui"));

const $$product = productModel.createProductModel();

const route = createRoute();

sample({
  clock: route.opened,
  source: route.$params,
  fn: (id: any) => id,
  target: $$product.getProductFx,
});

export const productRoute = { route };
export const ProductPage = {
  route,
  view: ProductLazy,
  layout: MainLayout,
};
