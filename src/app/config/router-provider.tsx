import { PropsWithChildren } from "react"
import { RouterProvider, Route } from 'atomic-router-react';
import { router } from "./router";

export const ProviderRoute = ({children}: PropsWithChildren) => {
	return (
		<RouterProvider router={router}>
			{children}
		</RouterProvider>
	)
}