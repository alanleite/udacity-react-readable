import { normalize } from 'normalizr'
import { entityUpdated } from '../../module/contants'
import { CommentSchema } from '../../module/schemas'
import { getComments } from '../../module/api'

export function loadComments(postId) {
    return async dispatch => {
        const response = await getComments(postId)
        const normalized = normalize(response.data, [CommentSchema])
        dispatch(entityUpdated(normalized.entities))
    }
}