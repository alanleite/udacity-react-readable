import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Label, Item, Header } from 'semantic-ui-react'
import Post from './../../containers/post'

export default ({
    category,
    categories = [],
    posts = [],
    categoryUpdated,
    loading,
    error
}) => (
        <Grid container>
            <Grid.Column width={4}>
                <Header size="large" content="Categories" dividing />
                <Label.Group size="large">
                    {categories.map((c, i) => (
                        <Label
                            color="blue"
                            basic={c.path !== category}
                            key={i}
                            as={Link}
                            to={`/${c.path}`}
                            content={c.name}
                            onClick={() => {
                                categoryUpdated(c.path)
                            }} />
                    ))}
                </Label.Group>
            </Grid.Column>
            <Grid.Column width={12}>
                <Header size="large" content="Posts" dividing />
                <Item.Group divided>
                    {posts.map((p, i) => (
                        <Post
                            key={i}
                            post={p} />
                    ))}
                </Item.Group>
            </Grid.Column>
        </Grid>
    )