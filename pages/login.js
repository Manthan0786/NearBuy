import { Button, Link } from "@mui/material";
import { useReducer, useState } from "react";
import { PrismaClient } from "@prisma/client";
import HeaderLogin from "../src/components/loginHeader";
import { useSession } from "next-auth/react";

function Login() {
    const { data: session } = useSession()
    if (session) {
      return (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )
    }
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )
}

export default Login;