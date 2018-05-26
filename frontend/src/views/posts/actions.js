import { createAction } from 'redux-actions'
import { normalize } from 'normalizr'
import { entityUpdated } from '../../module/contants'
import { PostSchema } from '../../module/schemas'
import { getAllPosts, getPosts, upPost, downPost, deletePost } from '../../module/api'

export const onLoadStart = createAction('views/posts/onLoadStart')
export const onLoadDone = createAction('views/posts/onLoadDone')
export const onPostDeleted = createAction('views/posts/onPostDeleted')

export function load (category) {
  return async dispatch => {
    try {
      dispatch(onLoadStart())
      const posts = await (category ? getPosts(category) : getAllPosts())
      const normalized = normalize(posts.data, [PostSchema])
      dispatch(entityUpdated(normalized.entities))
      dispatch(onLoadDone({
        posts: normalized.result, category
      }))
    } catch (error) {
      dispatch(onLoadDone({ error }))
    }
  }
}

export function postVoteUp (postId) {
  return async dispatch => {
    try {
      const response = await upPost(postId)
      const normalized = normalize(response.data, PostSchema)
      dispatch(entityUpdated(normalized.entities))
    } catch (error) {
      dispatch(onLoadDone({ error }))
    }
  }
}

export function postVoteDown (postId) {
  return async dispatch => {
    try {
      const response = await downPost(postId)
      const normalized = normalize(response.data, PostSchema)
      dispatch(entityUpdated(normalized.entities))
    } catch (error) {
      dispatch(onLoadDone({ error }))
    }
  }
}

export function postDelete (id, cb) {
  return async dispatch => {
    try {
      await deletePost(id)
      dispatch(onPostDeleted({ id }))
      if (cb) cb()
    } catch (error) {
      dispatch(onLoadDone({ error }))
    }
  }
}
