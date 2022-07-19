import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import App from '@/App'
import 'antd/dist/antd.css'
import '@/styles/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.Fragment>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.Fragment>

)