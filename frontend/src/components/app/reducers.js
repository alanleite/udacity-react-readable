import { handleActions } from 'redux-actions'
import { onLoadStart, onLoadDone } from './actions'

const defaultState = {
    loading: true,
    error: null
}

export default handleActions({
    [onLoadStart]: (state, { payload }) => {
        return {
            ...state,
            loading: true
        }
    },
    [onLoadDone]: (state, { payload }) => {
        return {
            ...state,
            ...payload,
            loading: false
        }
    },
}, defaultState)