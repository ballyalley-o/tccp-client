import React from 'react'
import App from 'app'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from 'app/store/store'

import 'design/style.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
