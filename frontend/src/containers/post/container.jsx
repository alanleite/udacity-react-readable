import React from 'react'
import { createComment } from '../../module/api'
import Component from './component'


class Post extends React.Component {

    state = {
        newBody: ''
    }

    comment = (comment) => {
        createComment({
            body: this.state.newBody
        }).then(r => {

        }).catch(err => {

        })
    }

    render() {
        const post = this.props.post
        return <Component {...post}/>
    }

}

export default Post