import React from 'react'
import Component from './component'

class Post extends React.Component {
    render() {
        const post = this.props.post
        return <Component {...post}/>
    }
}

export default Post