import { createRoutesView } from "atomic-router-react";

import { AccountPage } from "./Account";
import {AdminPage} from "./Admin";
import { SigninPage } from "./Auth/Signin";
import { SignUpPage } from "./Auth/Signup";
import { HomePage } from "./Home";
import { ProductPage } from "./Product";
import { ShopPage } from "./Shop";


const routes = [HomePage, ShopPage, ProductPage, AccountPage, SigninPage, SignUpPage, AdminPage]
export const View = createRoutesView({routes})