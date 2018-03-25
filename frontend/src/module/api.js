import axios from 'axios'
import shortid from 'shortid'

axios.defaults.baseURL = 'http://localhost:3001/'

axios.defaults.headers.Authorization = '123123123'

// Categories

export function getCategories() {
    return axios.get(`/categories`)
}

// Posts

export function getPosts(category) {
    return axios.get(`/${category}/posts`)
}

export function getAllPosts() {
    return axios.get(`/posts`)
}

export function getPost(post) {
    return axios.get(`/posts/${post}`)
}

export function createPost({ title, body, author, category }) {
    return axios.post(`/posts`, {
        id: shortid.generate(),
        timestamp: Date.now(),
        title, body, author, category
    })
}

export function editPost(postId, { title, body }) {
    return axios.put(`/posts/${postId}`, {
        title, body
    })
}

export function upPost(post) {
    return axios.post(`/posts/${post}`, { option: 'upVote' })
}

export function downPost(post) {
    return axios.post(`/posts/${post}`, { option: 'downVote' })
}

export function deletePost(post) {
    return axios.delete(`/posts/${post}`)
}

// Comments

export function getComments(postId) {
    return axios.get(`/posts/${postId}/comments`)
}

export function createComment(postId, { body, author }) {
    return axios.post(`/comments`, {
        id: shortid.generate(),
        parentId: postId,
        timestamp: Date.now(),
        body, author
    })
}

export function getComment(commentId) {
    return axios.get(`/comments/${commentId}`)
}

export function upComment(commentId) {
    return axios.post(`/comments/${commentId}`, { option: 'upVote' })
}

export function downComment(commentId) {
    return axios.post(`/comments/${commentId}`, { option: 'downVote' })
}

export function editComment(commentId, { body }) {
    return axios.put(`/comments/${commentId}`, {
        timestramp: Date.now(),
        body
    })
}

export function deleteComment(commentId) {
    return axios.delete(`/comments/${commentId}`)
}
