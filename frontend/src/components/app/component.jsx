import React from 'react'
import { Loader } from 'semantic-ui-react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AppBar from '../app-bar'
import PostsView from '../../views/posts'
import PostView from '../../views/post'

export default ({ loading }) => {

    if (loading) return <Loader active={true} />

    return (
        <BrowserRouter>
            <div>
                <AppBar />
                <Switch>
                    <Route exact path='/:category?' component={PostsView} />
                    <Route exact path='/:category/create-post' render={() => {
                        return null
                    }} />
                    <Route exact path='/:category/:post' component={PostView} />
                    <Route exact path='/:category/:post/edit' render={() => {
                        return <PostView editing />
                    }} />
                    <Redirect to='/' />
                </Switch>
            </div>
        </BrowserRouter>
    )

}