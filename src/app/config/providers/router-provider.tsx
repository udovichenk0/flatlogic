import { RouterProvider, Route } from 'atomic-router-react';
import { PropsWithChildren } from "react"

import { router } from "../router";

export const ProviderRoute = ({children}: PropsWithChildren) => {
	return (
		<RouterProvider router={router}>
			{children}
		</RouterProvider>
	)
}