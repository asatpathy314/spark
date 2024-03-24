import { User } from "next-auth";
import { fastApiRequest } from "./fastapi";

import { compare } from "bcrypt";

type LoginFn = (username: string, password: string) => Promise<User>;

export const login: LoginFn = async (username, password) => {
  const user = await fastApiRequest("/getPerson/"+username)
  if (user && (await compare(password, user.password))) {
    user.password = "";
    return user;
  } else throw new Error("User Not Found!");
};