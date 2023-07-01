"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
	const [error, setError] = useState("");
	const router = useRouter();
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);

		const result = await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false,
		});
		if (result?.error) {
			setError(result.error);
		} else {
			router.push("/");
		}
	};

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading title='Welcome back!' subtitle='Login to you account' />
			<Input
				id='email'
				label='Email'
				disabled={isLoading}
				register={register}
				errors={errors}
				name='email'
				required
			/>
			<Input
				id='password'
				label='Password'
				type='password'
				disabled={isLoading}
				register={register}
				errors={errors}
				name='password'
				required
			/>
		</div>
	);

	const footerContent = (
		<div className='flex flex-col gap-4 mt-3'>
			<hr />
			<Button
				outline
				label='Continue with Google'
				icon={FcGoogle}
				onClick={() => {}}
			/>
			<Button
				outline
				label='Continue with Github'
				icon={AiFillGithub}
				onClick={() => {}}
			/>
			<div className='text-neutral-500 text-center mt-4 font-light'>
				<div className='justify-center flex flex-row items-center gap-2'>
					<div>Dont have an account?</div>
					<div
						onClick={registerModal.onOpen}
						className='text-neutral-800 
					cursor-pointer
					hover:underline
					'>
						Log in
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title='Login'
			actionLabel='Continue'
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
