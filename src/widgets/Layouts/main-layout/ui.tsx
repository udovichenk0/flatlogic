import { PropsWithChildren } from "react"
import { Header } from "./header/Header"

export const MainLayout = ({children}: PropsWithChildren) => {
	return (
		<div>
			<Header/>
			{children}
		</div>
	)
}