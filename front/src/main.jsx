import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/Application/App'
import store from './state/store'
import { Provider } from 'react-redux'
import './index.css'


ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById("root"));
