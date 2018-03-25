import { connect } from 'react-redux'
import { denormalize } from 'normalizr'
import { PostSchema, CommentSchema } from '../../module/schemas'
import { load, postEdit, postDelete, commentAdd, commentDelete, commentVoteUp, commentVoteDown } from './actions'

const stateToProps = (state) => {
    const view = state.views.post
    const post = denormalize(view.post, PostSchema, state.entities)
    const comments = denormalize(view.comments, [CommentSchema], state.entities) || []
    return {
        post, comments,
        loading: view.loading || state.app.loading,
        error: view.error
    }
}

const dispatchToProps = (dispatch) => {
    return {
        load: (c) => dispatch(load(c)),
        postEdit: (i, d, c) => dispatch(postEdit(i, d, c)),
        postDelete: (i, c) => dispatch(postDelete(i, c)),
        commentAdd: (i, d, c) => dispatch(commentAdd(i, d, c)),
        commentDelete: (i) => dispatch(commentDelete(i)),
        commentVoteUp: (c) => dispatch(commentVoteUp(c)),
        commentVoteDown: (c) => dispatch(commentVoteDown(c)),
    }
}

export default (Component) => {
    return connect(stateToProps, dispatchToProps)(Component)
}