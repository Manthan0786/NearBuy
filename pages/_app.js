import '../public/css/styles.css'
import Header from '../src/components/BuyerHeader/header'
import { Provider } from "react-redux";
import { store, persistor } from '../src/components/store';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  persistor.persist()
  if (Component.name === "Login") {
    return (
      <><Component {...pageProps} /></>
    )
  } else if (Component.name === "Signup") {
    return (
      <><Component {...pageProps} /></>
    )
  }
  return (
    <>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}