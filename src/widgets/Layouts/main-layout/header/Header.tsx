import { NavigateButton } from "@/shared/ui/Buttons/navigate-button"
import { navigationRoutes, routes } from "./config"

// const routes = [
// 	{path: navigationRoutes.goToHomeRoute, label: 'Home'}
// ]

export const Header = () => {
	return (
		<header className="h-[60px] flex shadow-[0_4px_20px_rgb(38,38,38,0.1)] border-[1px] border-">
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
				<div>
					cont
				</div>
			</div>
		</header>
	)
}