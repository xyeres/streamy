import Head from 'next/head'
import { Provider } from 'react-redux'
import store from '../app/store'
import LayoutWrapper from '../components/Layout/LayoutWrapper'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <Head>
        <title>Stream United Pursuit and friends</title>
        <meta property="og:title" content="Stream music from United Pursuit" />
        <meta property="og:description" content="A growing music library of albums and exclusive tracks from United Pursuit and friends" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://streamy-nu.vercel.app" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/streamy-dev-51f11.appspot.com/o/static%2Fimages%2Fog%2FStreamyOGImage-1%400.75x.jpg?alt=media&token=dc57d86e-0b2c-4a7f-8913-d2ea3dd9a7fb" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:alt" content="Music streaming app screenshots" />
    </Head>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </Provider>
  )
}

export default MyApp