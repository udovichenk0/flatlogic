import { createRoutesView } from "atomic-router-react";
import { HomePage } from "./Home";
import { ShopPage } from "./Shop";


const routes = [HomePage, ShopPage]
export const View = createRoutesView({routes})