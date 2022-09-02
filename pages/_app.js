import '../public/css/styles.css'
import Header from '../src/components/BuyerHeader/header'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  if (Component.name === "Login") {
    return (
      <><Component {...pageProps} /></>
    )
  }
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}