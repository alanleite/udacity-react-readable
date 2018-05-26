import React from 'react'
import Component from './component'

class Post extends React.Component {

  state = {
    eTitle: '',
    eBody: '',
    eComment: '',
    initialized: false
  }

  getPostId = () => this.props.match.params.post

  componentWillReceiveProps(nextProps) {
    if (!this.state.initialized && nextProps.post) {
      this.setState({
        eTitle: nextProps.post.title,
        eBody: nextProps.post.body,
        initialized: true
      })
    }
  }

  componentDidMount() {
    this.props.load(this.getPostId())
  }

  commentVoteUp = (commentId) => {
    this.props.commentVoteUp(commentId)
  }

  commentVoteDown = (commentId) => {
    this.props.commentVoteDown(commentId)
  }

  onSubmitEdit = () => {
    if (this.state.initialized) {
      this.props.postEdit(this.props.post.id, {
        title: this.state.eTitle,
        body: this.state.eBody
      }, () => {
        this.props.history.push(`/${this.props.post.category.path}/${this.props.post.id}`)
      })
    }
  }

  onSubmitComment = () => {
    if (this.state.eComment) {
      this.props.commentAdd(this.props.post.id, {
        author: 'thingone',
        body: this.state.eComment
      }, () => {
        this.setState({
          eComment: ''
        })
      })
    }
  }

  onChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  onPostDelete = (e) => {
    e.preventDefault()
    this.props.postDelete(this.props.post.id, () => {
      this.props.history.push(`/${this.props.post.category.path}`)
    })
  }

  onCommentDelete = (id) => {
    this.props.commentDelete(id)
  }

  postVoteUp = () => {
    this.props.postVoteUp(this.props.post.id)
  }

  postVoteDown = () => {
    this.props.postVoteDown(this.props.post.id)
  }

  render() {
    return <Component
      {...this.state}
      editing={this.props.editing}
      post={this.props.post}
      comments={this.props.comments}
      onSubmitEdit={this.onSubmitEdit}
      onSubmitComment={this.onSubmitComment}
      onChange={this.onChange}
      commentVoteUp={this.commentVoteUp}
      commentVoteDown={this.commentVoteDown}
      onPostDelete={this.onPostDelete}
      onCommentDelete={this.onCommentDelete}
      postVoteUp={this.postVoteUp}
      postVoteDown={this.postVoteDown}
      />
  }

}

export default Post