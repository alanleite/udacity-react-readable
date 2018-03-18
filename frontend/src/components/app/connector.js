import { connect } from 'react-redux'
import { loadCategories } from './actions'

const stateToProps = (state) => {
    return {
        loading: state.app.loading
    }
}

const dispatchToProps = (dispatch) => {
    return {
        loadCategories: () => dispatch(loadCategories())
    }
}

export default (Component) => {
    return connect(stateToProps, dispatchToProps)(Component)
}