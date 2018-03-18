import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Grid, Label, Item } from 'semantic-ui-react'
import Post from '../../components/post'

const LabelsBlock = styled.div`
  p {
    padding-top: 25px;
    font-size: 26px;
  }
`

const PostsBlock = styled.div`
  p {
    padding-top: 25px;
    font-size: 26px;
  }
`

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
          <LabelsBlock>
            <p>Choose a category</p>
            <Label.Group size='large'>
              <Label
                color='blue'
                basic={!!category}
                as={Link}
                to={`/`}
                content='all'
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
          </LabelsBlock>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <PostsBlock>
            <p>Showing {posts.length} posts from {category || 'all'}</p>
            <Item.Group divided size='large'>
              {posts.map((p, i) => (
                <Post
                  key={i}
                  post={p} />
              ))}
            </Item.Group>
          </PostsBlock>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
