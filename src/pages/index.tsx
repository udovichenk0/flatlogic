import { createRoutesView } from "atomic-router-react";
import { AccountPage } from "./Account";
import { HomePage } from "./Home";
import { ProductPage } from "./Product";
import { ShopPage } from "./Shop";


const routes = [HomePage, ShopPage, ProductPage, AccountPage]
export const View = createRoutesView({routes})