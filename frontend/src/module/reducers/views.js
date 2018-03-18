import { combineReducers } from 'redux'
import posts from '../../views/posts/reducers'
import post from '../../views/post/reducers'

export default combineReducers({
    posts, post
})