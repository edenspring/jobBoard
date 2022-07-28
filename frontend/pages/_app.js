import '../styles/globals.css'
import { Provider } from 'react-redux'
import defaultStore from '../src/store'
import { useEffect } from 'react'
import useSWR from 'swr'
import cookieFetch from '../utilities/cookieFetch'


function MyApp({ Component, pageProps }) {
  // if (process.env.NODE_ENV !== 'production') {
  //   // cookieFetch('https://localhost:5000/api/csrf/restore')
  //   useSWR('/api/csrf/restore', cookieFetch)
  // }
  // useEffect(() => {
  //   if (process.env.NODE_ENV !== 'production') {
  //     fetch('https://localhost:5000/api/csrf/restore')
  //   }
  // }, [])
  const store = defaultStore()
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
