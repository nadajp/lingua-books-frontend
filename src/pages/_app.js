import 'src/styles/globals.css'
import AppLayout from 'src/components/layout'

export default function App({ Component, pageProps }) {
  return (
      <AppLayout>
        <Component {...pageProps}/>
      </AppLayout>
  )
}

