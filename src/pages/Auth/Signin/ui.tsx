import { Link } from 'atomic-router-react'

import { homeRoutes } from '@/shared/routing'

import loginImg from '/login.png'

import { SignInForm } from '@/features/auth'

import {createLoginModel} from "@/pages/Auth/Signin/auth.model";

const SignIn = () => {
	return (
		<div className='flex h-screen justify-between'>
			<div className='flex-1 flex justify-center'>
				<div className='px-8 flex max-w-[500px] flex-col w-full justify-center'>
					<Link className='font-bold text-base-dark text-[22px] mb-[100px]' to={homeRoutes.route}>
						Flatlogic<span className='text-brown'>.</span>
					</Link>
					<span className='font-bold text-lg mb-5'>Login</span>
					<SignInForm model={createLoginModel}/>
				</div>
			</div>
			<div className='flex-1 h-full object-cover'>
				<img className='object-cover w-full h-full' src={loginImg} alt="background" />
			</div>
		</div>
	)
}
export default SignIn