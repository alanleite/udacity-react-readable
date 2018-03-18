import { connect } from 'react-redux'
import { denormalize } from 'normalizr'
import { CategorySchema, PostSchema } from '../../module/schemas'
import { load } from './actions'

const stateToProps = (state) => {
    const view = state.views.posts
    const categories = denormalize(state.app.categories, [CategorySchema], state.entities) || []
    const posts = denormalize(view.posts, [PostSchema], state.entities) || []
    return {
        category: view.category,
        categories, posts,
        loading: view.loading,
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