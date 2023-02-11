import { BrownButton } from "@/shared/ui/Buttons/brown-button"

export const Footer = () => {
	return (
		<div className="bg-base-dark">
			<div className="container">
				<div className="flex items-center justify-between w-full border-b-[1px] border-gray">
					<div className="w-[472px] py-6">
						<h2 className="font-bold text-white text-[18px] mb-4">Many desktop publishing</h2>
						<p className="text-gray text-sm leading-6">Do you want to receive exclusive email offers? Subscribe to our newsletter! You will receive a unique promo code which gives you a 20% discount on all our products in 10 minutes.</p>
					</div>
						<form action="" className="flex gap-4">
								<input className="px-5 outline-none text-gray text-sm w-[290px]" placeholder="Enter your email" type="text" />
							<BrownButton text="Subscribe" action={() => console.log('2')}/>
						</form>
				</div>
				<div className="text-white border-b-[1px] flex justify-between w-full py-6 border-gray">
					<div className="w-[435px]">
						<h2 className="font-bold text-xl mb-6">Flatlogic.</h2>
						<p className="text-sm ">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
					</div>
					<div className="flex gap-20">
						<div>
							<h2 className="font-bold text-[18px] mb-4">COMPANY</h2>
							<div className="text-sm text-gray flex flex-col gap-2">
								<span>What We Do</span>
								<span>What We Do</span>
								<span>What We Do</span>
								<span>What We Do</span>
							</div>
						</div>
						<div>
							<h2 className="font-bold text-[18px] mb-4">MY ACCOUNT</h2>
							<div className="text-sm text-gray flex flex-col gap-2">
								<span>What We Do</span>
								<span>What We Do</span>
								<span>What We Do</span>
								<span>What We Do</span>
							</div>
						</div>
						<div>
							<h2 className="font-bold text-[18px] mb-4">CUSTOMER SERVICE</h2>
							<div className="text-sm text-gray flex flex-col gap-2">
								<span>What We Do</span>
								<span>What We Do</span>
								<span>What We Do</span>
								<span>What We Do</span>
							</div>
						</div>
					</div>
				</div>
				<div>
					<p className="text-sm text-gray py-8">© 2023 by <a href="https://github.com/kkkkhe" className="text-brown underline">kkkkhe</a> </p>
				</div>
			</div>
		</div>
	)
}