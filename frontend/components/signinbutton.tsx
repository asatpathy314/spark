"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Link } from "@nextui-org/link"
import React from "react";
import { Button } from "@nextui-org/button"

const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div>
        <Button  href="/" as={Link} onClick={() => signOut()} color="primary">
          Sign Out
        </Button>
      </div>
    );
  }
  return (
    <Button
      href="/signIn"
      as={Link}
      color="primary"
      showAnchorIcon
      variant="shadow"
    >
      Sign In
    </Button>
  );
};

export default SigninButton;