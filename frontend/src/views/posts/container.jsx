import React from 'react'
import Component from './component'

class Main extends React.Component {

    state = { sortBy: 'score' }

    getCategory = () => this.props.match.params.category

    sortByScore = () => this.setState({ sortBy: 'score' })

    sortByCreationDate = () => this.setState({ sortBy: 'creationDate' })

    componentDidMount() {
        this.load(this.getCategory())
    }

    load = (category) => {
        this.props.load(category)
    }

    categoryUpdated = (category) => {
        this.load(category)
    }

    postVoteUp = (postId) => {
        this.props.postVoteUp(postId)
    }

    postVoteDown = (postId) => {
        this.props.postVoteDown(postId)
    }

    postDelete = (postId) => {
        this.props.postDelete(postId)
    }

    sort = (posts) => {
        switch (this.state.sortBy) {
            case 'score':
                return posts.sort((a, b) => b.voteScore > a.voteScore);
            case 'creationDate':
                return posts.sort((a, b) => b.timestamp > a.timestamp);
            default:
                return posts
        }
    }
    
    render() {
        return <Component
            {...this.props}
            sortBy={this.state.sortBy}
            posts={this.sort(this.props.posts)}
            categoryUpdated={this.categoryUpdated}
            postVoteUp={this.postVoteUp}
            postVoteDown={this.postVoteDown}
            postDelete={this.postDelete} 
            sortByScore={this.sortByScore}
            sortByCreationDate={this.sortByCreationDate}
            />
    }

}

export default Main