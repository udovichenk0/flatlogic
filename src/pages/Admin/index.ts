import {lazy} from "react";

import {adminRoutes} from "@/shared/routing";

import {chainAdminRoute} from "@/entities/session/model";

import {MainLayout} from "@/widgets/Layouts/main-layout";

const Admin = lazy(() => import('./ui'))
const adminRoute = chainAdminRoute(adminRoutes.route)
export const AdminPage = {
    route: adminRoute,
    view: Admin,
    layout: MainLayout
}