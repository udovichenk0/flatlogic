import { lazy } from "react";

import { productRoutes } from "@/shared/routing";

import { MainLayout } from "@/widgets/Layouts/main-layout";

const ProductLazy = lazy(() => import("./ui"));

export const ProductPage = {
  route: productRoutes.route,
  view: ProductLazy,
  layout: MainLayout,
};
