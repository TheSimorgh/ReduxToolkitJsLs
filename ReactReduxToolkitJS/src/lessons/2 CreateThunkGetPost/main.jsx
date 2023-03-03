import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'

import { fetchUsers } from './redux/features/users/user.slice'

store.dispatch(fetchUsers())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <React.StrictMode>
    <App />
  </React.StrictMode>,
  </Provider>

)