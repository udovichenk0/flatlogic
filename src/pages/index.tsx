import { createRoutesView } from "atomic-router-react";
import { HomePage } from "./Home";
import { shopPage } from "./Shop";


const routes = [HomePage, shopPage]

export const View = createRoutesView({routes})