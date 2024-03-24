import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { fastApiRequest } from "@/app/lib/fastapi";
const bcrypt = require('bcrypt');


const handler = NextAuth({

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const res = await fastApiRequest("getPerson/"+credentials.email, 'GET', '');
        const user = await res.json();
        return new Promise((resolve, reject) => {
          bcrypt.compare(req.body.password, user.password, function(err, result) {
            if (err) {
              console.log(err);
              reject(err);
            }
            if (result) {
              resolve(user);
            } else {
              // Response is not allowed here, instead handle the response in the caller function
              reject(new Error('Passwords do not match'));
            }
          });
        });
      }
    })
  ],

  pages: {
    signIn: "/signIn",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
    async jwt({ token, trigger, session }) {
      if (trigger === "update" && session) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name
      }
      return token
    }

}});

export { handler as GET, handler as POST };
