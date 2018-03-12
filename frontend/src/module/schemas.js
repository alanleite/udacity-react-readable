import { schema } from 'normalizr'

export const CategorySchema = new schema.Entity('categories', {}, {
    idAttribute: 'name'
})


export const PostSchema = new schema.Entity('posts', {
    category: CategorySchema
})

export const CommentSchema = new schema.Entity('comments', {})