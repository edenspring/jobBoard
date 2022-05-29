import '../styles/globals.css'
import { Provider } from 'react-redux'
import defaultStore from '../store'

function MyApp({ Component, pageProps }) {
  const store = defaultStore()
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
