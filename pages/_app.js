import '../public/css/styles.css'
import Header from '../src/components/BuyerHeader/header';
import { SessionProvider } from "next-auth/react"

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  if (Component.name === "SignIn" || Component.name === "SignUp" || Component.name === "App") {
    return (
      <SessionProvider
        session={session}
        refetchInterval={5 * 60}
        refetchOnWindowFocus={true}
      >
        <Component {...pageProps} />
      </SessionProvider>
    )
  }
  return (
    <SessionProvider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      <Header {...pageProps}/>
      <Component {...pageProps} />
    </SessionProvider>
  )
}