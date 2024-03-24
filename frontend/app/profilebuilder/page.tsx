"use client"
import { subtitle, title } from "@/components/primitives";
import { useRef } from "react";
import {signIn, signOut, useSession} from "next-auth/react";
import { Input, Button} from '@nextui-org/react';
import {Textarea} from "@nextui-org/react";
import { fastApiRequest } from "../lib/fastapi";
import { useRouter } from "next/navigation";





export default function ProfileBuilder() {
	const { data: session, update} = useSession();
	const name = useRef("")
	const emailAddress = useRef("")
	const profile = useRef("")
	const link = useRef("")
	const router = useRouter()
	const college = useRef("")

	
	
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		const formData = {
			emailAddress : emailAddress.current,
			college: college.current,
			profile : profile.current,
			name: name.current,
			link : link.current
		}
		update({name:emailAddress})
		e.preventDefault();
		const response = await fastApiRequest(`updateProfile/${formData.emailAddress}`, 'PUT', formData);
		if(response && response.ok) {
			router.push("/matches")
		}
		else {
			router.push("/")
		}
	  };
	
	if (session && session.user) {
		console.log(session)
		return (
			<div>
				<h1 className={title()}>Build your profile!</h1>
				<h2 className={subtitle()}>Put your best foot forward! This is the first thing your mentor/student will see.</h2>
				<br/>
				<br/>
				<form onSubmit={onSubmit}>
				<Input fullWidth placeholder="Your Name" onChange={(e: any) => name.current = e.target.value} />
				<br />
				<Input fullWidth placeholder="Your Email" onChange={(e: any) => emailAddress.current = e.target.value}/>
				<br/>
				<Input fullWidth placeholder="Your Dream College! (or the one you're attending right now)" onChange={(e: any) => college.current = e.target.value}/>
				<br/>
				<Input fullWidth placeholder="Your LinkedIn" onChange={(e: any) => link.current = e.target.value}/>
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
