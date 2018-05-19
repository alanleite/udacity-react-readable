import React from 'react'
import { createPost } from '../../module/api'
import PostCreateComponent from './component'

class PostCreateContainer extends React.Component {
  state = {
    eTitle: '',
    eBody: '',
    loading: false,
    error: null
  }
  onChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }
  onSubmit = async () => {
    const category = this.props.match.params.category
    await createPost({ 
      title: this.state.eTitle,
      body: this.state.eBody,
      category
    })
    this.props.history.push(`/${category}`)
  }
  render () {
    return <PostCreateComponent
      {...this.state}
      category={this.props.match.params.category}
      onChange={this.onChange}
      onSubmit={this.onSubmit}
     />
  }
}

export default PostCreateContainer
