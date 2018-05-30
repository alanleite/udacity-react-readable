import { connect } from 'react-redux'
import { denormalize } from 'normalizr'
import { PostSchema, CommentSchema } from '../../module/schemas'
import { load, postEdit, postDelete, commentAdd, commentEdit, commentDelete, commentVoteUp, commentVoteDown } from './actions'
import { postVoteUp, postVoteDown } from '../posts/actions'

const stateToProps = (state) => {
  const view = state.views.post
  const post = denormalize(view.post, PostSchema, state.entities)
  const comments = denormalize(view.comments, [CommentSchema], state.entities) || []
  return {
    post,
    comments,
    loading: view.loading || state.app.loading,
    error: view.error
  }
}

const dispatchToProps = (dispatch) => {
  return {
    load: (c, a) => dispatch(load(c, a)),
    postEdit: (i, d, c) => dispatch(postEdit(i, d, c)),
    postDelete: (i, c) => dispatch(postDelete(i, c)),
    commentAdd: (i, d, c) => dispatch(commentAdd(i, d, c)),
    commentEdit: (i, d, c) => dispatch(commentEdit(i, d, c)),
    commentDelete: (i) => dispatch(commentDelete(i)),
    commentVoteUp: (c) => dispatch(commentVoteUp(c)),
    commentVoteDown: (c) => dispatch(commentVoteDown(c)),
    postVoteUp: (c) => dispatch(postVoteUp(c)),
    postVoteDown: (c) => dispatch(postVoteDown(c))
  }
}

export default (Component) => {
  return connect(stateToProps, dispatchToProps)(Component)
}
