import { Link } from 'atomic-router-react'
import {modelView} from "effector-factorio";
import { useForm } from 'effector-forms'
import { SyntheticEvent } from 'react'

import { signUpRoutes } from '@/shared/routing'
import { AuthInput } from '@/shared/ui/inputs/auth-imput'

import {loginFactory} from "./signin.model"


export const SignInForm = modelView(loginFactory, () => {
	const model = loginFactory.useModel()
	const {fields, errorText,submit} = useForm(model.loginForm)

	const onSubmit = (e:SyntheticEvent) => {
		e.preventDefault()
		submit()
	}
	return (
			<form className='flex flex-col gap-5' onSubmit={onSubmit}>
				<AuthInput
					value={fields.email.value}
					placeholder={'email@gmail.com'}
					name={'Email'}
					onChange={fields.email.onChange}
					disable={false}
					errorText={errorText('email')}
				/>
				<AuthInput
					value={fields.password.value}
					placeholder={'password'}
					name={'Password'}
					onChange={fields.password.onChange}
					disable={false}
					errorText={errorText('password')}
				/>
				<div className='flex justify-between items-center'>
					<Link to={signUpRoutes.route} className='text-sm text-brown'>Create an account</Link>
					<button onSubmit={onSubmit}
							className='px-[30px] py-[14px] bg-brown hover:bg-[#af6c47] transition-colors duration-200 font-bold text-sm text-white'>
						LOGIN
					</button>
				</div>
			</form>
	)
})