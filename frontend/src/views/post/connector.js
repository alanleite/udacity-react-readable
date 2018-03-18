import { connect } from 'react-redux'
import { denormalize } from 'normalizr'
import { PostSchema, CommentSchema } from '../../module/schemas'
import { load } from './actions'

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
        load: (c) => dispatch(load(c))
    }
}

export default (Component) => {
    return connect(stateToProps, dispatchToProps)(Component)
}