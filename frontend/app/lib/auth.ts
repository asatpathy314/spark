import { User } from "next-auth";
import { fastApiRequest } from "./fastapi";

import { compare } from "bcrypt";

type LoginFn = (username: string, password: string) => Promise<User>;

export const login: LoginFn = async (username, password) => {
  const user = await fastApiRequest("/getPerson/"+username, 'GET', '')
  if (user && (await compare(password, user.password))) {
    user.password = "";
    console.log(user)
    return user;
  } else throw new Error("User Not Found or Password Incorrect!");
};