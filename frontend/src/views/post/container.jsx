import React from 'react'
import Component from './component'

class Post extends React.Component {

  state = {}

  getPostId = () => this.props.match.params.post

  componentDidMount() {
    this.props.load(this.getPostId())
  }

  render () {
    return <Component
      {...this.props}
      {...this.state} />
  }

}

export default Post