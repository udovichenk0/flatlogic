import { Link } from 'atomic-router-react'
import {modelView} from "effector-factorio";
import { useForm } from 'effector-forms'
import { SyntheticEvent } from 'react'

import { signInRoutes } from '@/shared/routing'
import { AuthInput } from '@/shared/ui/inputs/auth-imput'

import { registerFactory } from "./signup.model"

export const SignUpForm = modelView(registerFactory,() => {
	const model = registerFactory.useModel()
	const {fields, errorText,submit} = useForm(model.registerForm)
	
	const onSubmit = (e:SyntheticEvent) => {
		e.preventDefault()
		submit()
	}
	return (
		<div>
			<form className='flex flex-col gap-5' onSubmit={onSubmit}>
				<div className='flex gap-5'>
					<AuthInput
					value={fields.name.value}
					placeholder={'Name'}
					name={'Name'}
					onChange={fields.name.onChange}
					disable={false}
					errorText={errorText('name')}
					/>
					<AuthInput
					value={fields.surname.value}
					placeholder={'Surname'}
					name={'Surname'}
					onChange={fields.surname.onChange}
					disable={false}
					errorText={errorText('surname')}
					/>
				</div>
				<AuthInput
				value={fields.email.value}
				placeholder={'Email'}
				name={'Email'}
				onChange={fields.email.onChange}
				disable={false}
				errorText={errorText('email')}
				/>
				<AuthInput
				value={fields.password.value}
				placeholder={'Password'}
				name={'Password'}
				onChange={fields.password.onChange}
				disable={false}
				errorText={errorText('password')}
				/>
				<AuthInput
				value={fields.confirmation.value}
				placeholder={'Password'}
				name={'Repeat Password'}
				onChange={fields.confirmation.onChange}
				disable={false}
				errorText={errorText('confirmation')}
				/>
				<div className='flex justify-between items-center'>
					<Link to={signInRoutes.route} className='text-sm text-brown'>Log In to your account</Link>
					<button onSubmit={onSubmit}
					className='px-[30px] py-[14px] bg-brown hover:bg-[#af6c47] transition-colors duration-200 font-bold text-sm text-white'>
						SIGN UP
					</button>
				</div>
			</form>
		</div>
	)
})