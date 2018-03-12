import { handleActions } from 'redux-actions'
import merge from 'merge'
import { entityUpdated } from '../contants'

export default handleActions({
    [entityUpdated]: (state, { payload }) => {
        return merge.recursive({}, state, payload)
    }
}, {})
