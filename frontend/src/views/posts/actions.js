import { createAction } from 'redux-actions'
import { normalize } from 'normalizr'
import { entityUpdated } from '../../module/contants'
import { CategorySchema, PostSchema } from '../../module/schemas'
import { getCategories, getAllPosts, getPosts } from '../../module/api'

export const onLoadStart = createAction('views/posts/onLoadStart')
export const onLoadDone = createAction('views/posts/onLoadDone')

export function load(category) {
    return async dispatch => {
        try {

            dispatch(onLoadStart())

            const posts = await (category ? getPosts(category) : getAllPosts())

            const normalized = normalize(posts.data, [PostSchema])

            dispatch(entityUpdated(normalized.entities))

            dispatch(onLoadDone({
                posts: normalized.result, category
            }))

        }
        catch (error) {

            dispatch(onLoadDone({ error }))

        }
    }
}