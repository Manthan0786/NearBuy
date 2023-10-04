import { useRouter } from 'next/router'
import '../public/css/styles.css'
import BuyerHeader from '../src/components/BuyerHeader/header';
import SellerHeader from '../src/components/SellerHeader/header';
import { SessionProvider } from "next-auth/react"
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps, session }) {
  const router = useRouter();
  const isSeller = router.pathname.startsWith("/seller");

  if (Component.name === "SignIn" || Component.name === "SignUp" || Component.name === "App") {
    return (
      <SessionProvider
      sessionData={session}
        refetchInterval={5 * 60}
        refetchOnWindowFocus={true}
      >
        <Component {...pageProps} />
      </SessionProvider>
    )
  }
  return (
    <>
      <SessionProvider
        sessionData={session}
        refetchInterval={5 * 60}
        refetchOnWindowFocus={true}
      >
        {isSeller ? <SellerHeader /> : <BuyerHeader />}
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}