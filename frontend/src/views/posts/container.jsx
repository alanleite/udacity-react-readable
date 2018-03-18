import React from 'react'
import Component from './component'

class Main extends React.Component {

    getCategory = () => this.props.match.params.category

    componentDidMount() {
        this.load(this.getCategory())
    }

    load = (category) => {
        this.props.load(category)
    }

    categoryUpdated = (category) => {
        this.load(category)
    }

    render() {
        return <Component
            {...this.props}
            categoryUpdated={this.categoryUpdated} />
    }

}

export default Main