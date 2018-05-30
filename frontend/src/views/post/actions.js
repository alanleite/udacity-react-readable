import { createAction } from 'redux-actions'
import { normalize } from 'normalizr'
import { entityUpdated } from '../../module/contants'
import { PostSchema, CommentSchema } from '../../module/schemas'
import { getPost, editPost, deletePost, getComments, createComment, deleteComment, upComment, downComment, editComment } from '../../module/api'

export const onLoadStart = createAction('views/post/onLoadStart')
export const onLoadDone = createAction('views/post/onLoadDone')
export const onCommentAdded = createAction('views/post/onCommentAdded')
export const onCommentDeleted = createAction('views/post/onCommentDeleted')

export function load (postId, errorCb) {
  return async dispatch => {
    try {
      dispatch(onLoadStart())
      const parallel = [getPost(postId), getComments(postId)]
      const [post, comments] = await Promise.all(parallel)
      const normalized = normalize({
        post: post.data,
        comments: comments.data
      }, { post: PostSchema, comments: [CommentSchema] })
      dispatch(entityUpdated(normalized.entities))
      dispatch(onLoadDone(normalized.result))
    } catch (error) {
      dispatch(onLoadDone({ error }))
      if (errorCb) errorCb()
    }
  }
}

export function postEdit (id, data, cb) {
  return async dispatch => {
    try {
      const response = await editPost(id, data)
      const normalized = normalize(response.data, PostSchema)
      dispatch(entityUpdated(normalized.entities))
      if (cb) cb()
    } catch (error) {
      dispatch(onLoadDone({ error }))
    }
  }
}

export function postDelete (id, cb) {
  return async dispatch => {
    try {
      await deletePost(id)
      if (cb) cb()
    } catch (error) {
      dispatch(onLoadDone({ error }))
    }
  }
}

export function commentAdd (postId, data, cb) {
  return async dispatch => {
    try {
      const response = await createComment(postId, data)
      const normalized = normalize(response.data, CommentSchema)
      dispatch(entityUpdated(normalized.entities))
      dispatch(onCommentAdded(response.data.id))
      if (cb) cb()
    } catch (error) {
      dispatch(onLoadDone({ error }))
    }
  }
}

export function commentDelete (id, cb) {
  return async dispatch => {
    try {
      await deleteComment(id)
      dispatch(onCommentDeleted(id))
      if (cb) cb()
    } catch (error) {
      dispatch(onLoadDone({ error }))
    }
  }
}

export function commentVoteUp (commentId) {
  return async dispatch => {
    try {
      const response = await upComment(commentId)
      const normalized = normalize(response.data, CommentSchema)
      dispatch(entityUpdated(normalized.entities))
    } catch (error) {
      dispatch(onLoadDone({ error }))
    }
  }
}

export function commentVoteDown (commentId) {
  return async dispatch => {
    try {
      const response = await downComment(commentId)
      const normalized = normalize(response.data, CommentSchema)
      dispatch(entityUpdated(normalized.entities))
    } catch (error) {
      dispatch(onLoadDone({ error }))
    }
  }
}

export function commentEdit (commentId, body, cb) {
  return async dispatch => {
    try {
      const response = await editComment(commentId, { body })
      const normalized = normalize(response.data, CommentSchema)
      dispatch(entityUpdated(normalized.entities))
      cb()
    } catch (error) {
      dispatch(onLoadDone({ error }))
    }
  }
}
