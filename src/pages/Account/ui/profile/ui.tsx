import { User } from "@/shared/api/User"

// eslint-disable-next-line import/no-internal-modules
import userImage from './assets/user.png'

export const Profile = ({session}:{session: User}) => {
	return (
		<div className="bg-[#f5f5f5] w-[300px] p-8">
			<div className="flex flex-col items-center">
				<div className="flex flex-col items-center w-full border-b-2 border-[#d3d3d3] pb-8 mb-8">
					<div className="w-24 h-24 mb-4 border-2 border-[#d3d3d3] rounded-full flex items-center justify-center">
						<img className="w-20 h-20 rounded-full" src={session.avatar_url || userImage} alt="" />
					</div>
					<div className="flex gap-1 text-brown text-lg font-bold mb-2">
						<span>{session.name}</span>
						<span>{session.surname}</span>
					</div>
					<span className="font-sm text-gray">{session.email}</span>
				</div>
				<div className="pb-8 mb-8 border-b-2 border-[#d3d3d3] w-full">
					<h2 className="font-bold text-base-dark text-sm mb-4">Delivery Address</h2>
					<span className="text-gray text-sm">{session.delivery_address || 'not set'}</span>
				</div>
				<div className="pb-8 mb-8 border-b-2 border-[#d3d3d3] w-full">
					<h2 className="font-bold text-base-dark text-sm mb-4">Payment Method</h2>
					<span className="text-gray text-sm">{session.payment_method || 'not set'}</span>
				</div>
				<div className="pb-8 mb-8 border-b-2 border-[#d3d3d3] w-full">
					<h2 className="font-bold text-base-dark text-sm mb-4">Billing Address</h2>
					<span className="text-gray text-sm">{session.billing_address || 'not set'}</span>
				</div>
			</div>
		</div>
	)
}