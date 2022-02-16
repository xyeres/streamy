import { Provider } from 'react-redux'
import store from '../app/store'
import LayoutWrapper from '../components/Layout/LayoutWrapper'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </Provider>
  )
}

export default MyApp