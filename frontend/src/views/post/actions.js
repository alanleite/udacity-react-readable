import { createAction } from 'redux-actions'
import { normalize } from 'normalizr'
import { entityUpdated } from '../../module/contants'
import { PostSchema, CommentSchema } from '../../module/schemas'
import { getPost, getComments } from '../../module/api'

export const onLoadStart = createAction('views/post/onLoadStart')
export const onLoadDone = createAction('views/post/onLoadDone')

export function load(postId) {
    return async dispatch => {
        try {
            dispatch(onLoadStart())
            const parallel = [getPost(postId), getComments(postId)]
            const [post, comments] = await Promise.all(parallel)
            const normalized = normalize({ 
                post: post.data, 
                comments: comments.data }, { PostSchema, CommentSchema })
            dispatch(entityUpdated(normalized.entities))
            dispatch(onLoadDone(normalized.result))
        }
        catch (error) {
            dispatch(onLoadDone({ error }))
        }
    }
}