import Store from '../context/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <Component {...pageProps} />
    </Store>
  )
}

export default MyApp
