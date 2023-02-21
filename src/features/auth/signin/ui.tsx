import { useForm } from 'effector-forms'
import { SyntheticEvent } from 'react'

import { AuthInput } from '@/shared/ui/inputs/auth-imput'

import { loginForm } from "./model"

export const SignInForm = () => {
	const {fields, eachValid, errorText,submit} = useForm(loginForm)
	const test = useForm(loginForm)
	
	const onSubmit = (e:SyntheticEvent) => {
		e.preventDefault()
		submit()
	}
	fields.email.onChange
	return (
		<div>
			<form className='flex flex-col gap-5' onSubmit={onSubmit}>
				<AuthInput
				value={fields.email.value}
				placeholder={'email@gmail.com'}
				name={'Email'}
				onChange={fields.email.onChange}
				disable={false}
				/>
				<AuthInput
				value={fields.password.value}
				placeholder={'password'}
				name={'Password'}
				onChange={fields.password.onChange}
				disable={false}
				/>
				<div className='flex justify-between items-center'>
					<span className='text-sm text-brown'>Create an account</span>
					<button onSubmit={onSubmit}
					className='px-[30px] py-[14px] bg-brown hover:bg-[#af6c47] transition-colors duration-200 font-bold text-sm text-white'>
						LOGIN
					</button>
				</div>
			</form>
		</div>
	)
}