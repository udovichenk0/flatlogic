import { PropsWithChildren } from "react"
import { ToastContainer } from "react-toastify"

export const ToastifyProvider = ({children}:PropsWithChildren) => {
	return (
		<>
			<ToastContainer
			position="top-right"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			pauseOnHover={false}
			pauseOnFocusLoss={false}
			limit={4}
			closeOnClick
			rtl={false}
			theme="light"/>
			{children}
			<ToastContainer/>
		</>
	)
}