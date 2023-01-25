import dynamic from 'next/dynamic'
import '../styles/globals.css'

const Store = dynamic(() => import('../context/store'), {
  ssr: false
})

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <Component {...pageProps} />
    </Store>
  )
}

export default MyApp
