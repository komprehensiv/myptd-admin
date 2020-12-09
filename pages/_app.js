import { createStore, StoreProvider } from 'easy-peasy'
import '../styles/globals.css'
import { storeModel } from '../model'

const store = createStore(storeModel)

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
