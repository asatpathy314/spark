"use client"
import { subtitle, title } from "@/components/primitives";
import { useRef } from "react";
import {signIn, signOut, useSession } from "next-auth/react";
import { Input, Button} from '@nextui-org/react';
import {Textarea} from "@nextui-org/react";

export default function ProfileBuilder() {
	const { data: session } = useSession();
	const name = useRef("")
	const profile = useRef("")
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	  };

	if (session && session.user) {
		console.log(session)
		return (
			<div>
				<h1 className={title()}>Build your profile!</h1>
				<h2 className={subtitle()}>Put your best foot forward! This is the first thing your mentor will see.</h2>
				<br/>
				<br/>
				<form onSubmit={onSubmit}>
				<Input fullWidth placeholder="Your Name"/>
				<br/>
				<Textarea
					minRows={12}
					label="Profile"
					placeholder="Enter your Profile"
				/>
				<br/>
				<Button type="submit" color="primary" size="lg">Submit</Button>
				</form>
			</div>
		);
	}
	console.log(session)
	return (
		<h1 className={title()}>You are not authenticated, please sign in again.</h1>
	);
};
