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

    <Grid.Row>
      <Grid.Column>
        <Header content='Categories' />
        <Label.Group size='large'>
          <Label
            color='blue'
            basic={!!category}
            as={Link}
            to={`/`}
            content='All'
            onClick={() => {
              categoryUpdated(null)
            }} />
          {categories.map((c, i) => (
            <Label
              color='blue'
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
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Header content='Posts' />
        <Item.Group divided size='large'>
          {posts.map((p, i) => (
            <Post
              key={i}
              post={p} />
          ))}
        </Item.Group>
      </Grid.Column>
    </Grid.Row>

  </Grid>
)
