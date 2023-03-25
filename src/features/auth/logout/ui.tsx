import { logoutTriggered } from "./logout.model"

export const Logout = () => {
	return (
		<button className="bg-brown text-white p-2 hover:bg-[#bb683c] transition-colors duration-200" onClick={() => logoutTriggered()}>Logout</button>
	)
}