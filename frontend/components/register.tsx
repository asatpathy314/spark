"use client"
import React, { useRef } from "react";
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { fastApiRequest } from "@/app/lib/fastapi";
import { RadioGroup, Radio } from "@nextui-org/react";
import bcrypt from 'bcryptjs'; // Import bcryptjs instead of bcrypt

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const saltRounds = 10;

const Login = (props: Props) => {
  const router = useRouter();
  const userName = useRef("");
  const pass = useRef("");
  const repeatpass = useRef("");
  const isMentor = useRef("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      emailAddress: userName.current.valueOf(), // Access value property of the ref
      college: "",
      profile: "",
      entities: [],
      name: "",
      isMentor: isMentor.current === "Student" ? false : true,
      password: pass.current
    };

    try {
      // Hash the password asynchronously
      const hashedPassword = await bcrypt.hash(formData.password, saltRounds);
      formData.password = hashedPassword;

      const response = await fastApiRequest(`/register/${formData.emailAddress}`, 'POST', formData);

      if (response.status === "entry added") {
        router.push("/profilebuilder");
      } else {
        console.error("Registration failed")
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  
  return (
    <section className="bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          Spark   
        </a>
        <div className="w-[400px] bg-white rounded-lg shadow xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Register your account
            </h1>
            {!!props.error && (
              <p className="bg-red-100 text-red-600 text-center p-2">
                Authentication Failed
              </p>
            )}
          <form onSubmit={onSubmit} className="space-y-4 md:space-y-6 text-left" autoComplete="off">
          <Input
                name="username"
                label="Email"
                type = "text"
                placeholder="example@fakegmail.com"
                className="block mb-2 text-sm font-medium text-gray-900"
                onChange={(e:any) => (userName.current = e.target.value)}
              >
              </Input>
              <Input
                name="password"
                type="password"
                label="Password"
                placeholder="••••••••" 
                className="block mb-2 text-sm font-medium text-gray-900"
                onChange={(e) => (pass.current = e.target.value)}
              >
              </Input>
              <Input
                name="password"
                type="password"
                label="Repeat Password"
                placeholder="••••••••" 
                className="block mb-2 text-sm font-medium text-gray-900"
                onChange={(e) => (repeatpass.current = e.target.value)}
              >
              </Input>
          <RadioGroup
            label="Select your role"
            orientation="horizontal"
            defaultValue="default"
            onValueChange={(e) => (isMentor.current = e.valueOf())} // Added missing closing parenthesis
          >
            <Radio value="default">Mentor</Radio>
            <Radio value="primary">Student</Radio>
          </RadioGroup>
            <div className="flex items-center justify-center mt-2 gap-2">
            <Button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Sign In
            </Button>
          </div>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
