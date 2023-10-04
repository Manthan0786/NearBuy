import React from "react";
import Link from 'next/link';
import { useSession } from "next-auth/react";

export default function App() {
  const { data: session, data, status, update } = useSession()

  return (
    <React.Fragment>
      <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Playfair+Display" />
      <div style={{ display: 'flex', width: "100%", height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: '500px', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor
            : '#787276', gap: '30px', flexDirection: 'column', color: 'white'
        }}>
          <h2> Welcome to NearBuy</h2>
          <Link
            href={"/buyer/SignIn/signin"}>
            <button style={{ width: '200px', backgroundColor: 'black', color: 'white', padding: '10px' }}>Buyer Login</button>
          </Link>

          <Link
            href={"/seller/SignIn/signin"}>
            <button style={{ width: '200px', backgroundColor: 'black', color: 'white', padding: '10px' }}>Seller Login</button>
          </Link>
        </div>
      </div>
    </React.Fragment>

  )
}
