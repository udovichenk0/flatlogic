import { NavigateButton } from "@/shared/ui/Buttons/navigate-button"
import { Link } from "atomic-router-react"
import { iconNavigations, navigationRoutes, routes } from "./config"


export const Header = () => {
	return (
		<header className="h-[60px] flex shadow-[0_4px_20px_rgb(38,38,38,0.1)]">
			<div className="container px-5 h-full flex items-center justify-between">
				<h2 className="font-bold text-[17.5px]">Flatlogic</h2>
				<nav className="flex gap-2 h-full">
					{routes.map(({path, label, dropItems}) => {
						return (
							<div key={label} className='h-full flex items-center'>
								<NavigateButton path={path} label={label} dropItems={dropItems}/>
							</div>
						)
					})}
				</nav>
				<div className="flex gap-3">
					{iconNavigations.map(({path, Icon}, id) => {
						return (
							<Link to={path} key={id} className='hover:text-[#bd744c] duration-300 p-2'>
								<Icon/>
							</Link>
						)
					})}
				</div>
			</div>
		</header>
	)
}