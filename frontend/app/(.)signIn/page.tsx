import Login from "@/components/login";
import React from "react";
type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};
const signInPageIntercepted = (props: Props) => {
  return (
      <Login
        error={props.searchParams?.error}
        callbackUrl={props.searchParams?.callbackUrl}
      />
  );
};

export default signInPageIntercepted;