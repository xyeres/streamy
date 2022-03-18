import React from 'react'
import { render } from '@testing-library/react'
import store from './app/store'
import { Provider } from 'react-redux'
import LayoutWrapper from './components/Layout/LayoutWrapper'


const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
    </Provider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }