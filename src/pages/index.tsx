import { createRoutesView } from "atomic-router-react";
import { HomePage } from "./Home";
import { ProductPage } from "./Product";
import { ShopPage } from "./Shop";


const routes = [HomePage, ShopPage, ProductPage]
export const View = createRoutesView({routes})