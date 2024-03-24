"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const Login = (props: Props) => {
  const {data: session, status, update} =useSession()
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false); // State for error

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email", email)
    const res = await signIn("credentials", {
      email: email,
      password: pass,
      redirect: false,
    });

    if (res && res.ok) {
      router.push("/profilebuilder");
    } else {
      setError(true); // Set error state to true
      console.log(res);
    }
  };

  return (
    <section className="bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 text-left">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Spark
        </a>
        <div className="w-[400px] bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
              <Input
                name="username"
                label="Email"
                type="text"
                placeholder="example@fakegmail.com"
                isInvalid={error}
                className="block mb-2 text-sm font-medium text-gray-900"
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                name="password"
                type="password"
                label="Password"
                isInvalid={error}
                placeholder="••••••••"
                className="block mb-2 text-sm font-medium text-gray-900"
                onChange={(e) => setPass(e.target.value)}
              />
              <div className="flex items-center justify-center mt-2 gap-2">
                <Button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Sign In
                </Button>
              </div>
              {error && (
                <div className="text-red-500">
                  There was an error with your login.
                </div>
              )}
              <div>
                <p className="w-full flex text-sm font-light text-gray-500">
                  Don’t have an account yet?&nbsp;
                  <a href="/register" className="font-medium text-primary-600 hover:underline">
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
