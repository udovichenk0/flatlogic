import { controls } from "@/shared/routing";
import { MainLayout } from "@/widgets/Layouts/main-layout";
import { createRoute, createRouterControls, querySync } from "atomic-router";
import { createEvent, createStore } from "effector";
import { debounce } from "patronum";
import { lazy } from "react";

const ProductLazy = lazy(() => import("./ui"));
const route = createRoute();
const queryChanged = createEvent();

const $query = createStore("").on(queryChanged, (_, query) => query);

querySync({
  source: { query: $query },
  clock: debounce({ source: queryChanged, timeout: 30 }),
  route,
  controls,
});

export const productRoute = { route };
export const ProductPage = {
  route,
  view: ProductLazy,
  layout: MainLayout,
};
