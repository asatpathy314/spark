import NextAuth from "next-auth";

declare module "next-auth" {
  type User = {
    email: string;
    college: string;
    profile: string;
    entities: [];
    name: string;
    isMentor: boolean;
    password?: string;
  };
}
