import merge from 'merge'
import { handleActions } from 'redux-actions'
import { entityUpdated } from '../contants'

export default handleActions({
  [entityUpdated]: (state, { payload }) => {
    return merge.recursive({}, state, payload)
  }
}, {})
