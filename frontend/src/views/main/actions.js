import { createAction } from 'redux-actions'
import { normalize } from 'normalizr'
import { entityUpdated } from '../../module/contants'
import { CategorySchema, PostSchema } from '../../module/schemas'
import { getCategories, getAllPosts, getPosts } from '../../module/api'

export const onLoadStart = createAction('views/main/on-load-start')
export const onLoadDone = createAction('views/main/on-load-done')

export function load(category) {
    return async dispatch => {
        try {

            dispatch(onLoadStart())

            const [categoriesResponse, postsResponse] = await Promise.all([
                getCategories(),
                category ? getPosts(category) : getAllPosts()
            ])

            const normalized = normalize({
                categories: categoriesResponse.data.categories,
                posts: postsResponse.data
            }, {
                    categories: [CategorySchema],
                    posts: [PostSchema]
                })

            dispatch(entityUpdated(normalized.entities))

            dispatch(onLoadDone({
                ...normalized.result, category
            }))
            
        }
        catch (error) {

            dispatch(onLoadDone({ error }))

        }
    }
}