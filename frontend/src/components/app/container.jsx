import React from 'react'
import Component from './component'

class App extends React.Component {
  componentDidMount () {
    this.props.loadCategories()
  }

  render () {
    return <Component {...this.props} />
  }
}

export default App
