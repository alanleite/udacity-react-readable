import { handleActions } from 'redux-actions'
import {
  onLoadStart,
  onLoadDone,
  onCommentAdded,
  onCommentDeleted
} from './actions'

const defaultState = {
  post: null,
  comments: [],
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
  [onCommentAdded]: (state, { payload }) => {
    return {
      ...state,
      comments: [...state.comments, payload]
    }
  },
  [onCommentDeleted]: (state, { payload }) => {
    return {
      ...state,
      comments: state.comments.filter(id => id !== payload)
    }
  }
}, defaultState)
