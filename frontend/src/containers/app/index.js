import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import store from '../../module/store'

import AppBar from '../app-bar'
import MainView from '../../views/main'
import PostView from '../../views/post'

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <AppBar />
            <Switch>
              <Route exact path='/:category?' component={MainView} />
              <Route exact path='/:category/:post_id' component={PostView} />
              <Redirect to='/' />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
