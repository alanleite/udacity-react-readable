import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Grid, Label, Item, Select } from 'semantic-ui-react'
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
  history,
  sortBy,
  category,
  categories = [],
  posts = [],
  categoryUpdated,
  loading,
  error,
  postVoteUp,
  postVoteDown,
  postDelete,
  sortByScore,
  sortByCreationDate
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
            <Label
              style={{ cursor: 'pointer' }}
              basic={sortBy !== 'score'}
              color='red'
              content='ByScore'
              onClick={sortByScore} />
            <Label
              style={{ cursor: 'pointer' }}
              basic={sortBy !== 'creationDate'}
              color='red'
              content='ByCreationDate'
              onClick={sortByCreationDate} />
          </Label.Group>
        </LabelsBlock>
        <br />
        <Select
          placeholder='Create new post in...'
          options={categories.map(c => ({
            key: c.name,
            value: c.name,
            text: c.name
          }))}
          onChange={(e, { name, value }) => {
            history.push(`${value}/create-post`)
          }}
        />
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
                post={p}
                postVoteUp={() => { postVoteUp(p.id) }}
                postVoteDown={() => { postVoteDown(p.id) }}
                postDelete={() => { postDelete(p.id) }} />
            ))}
          </Item.Group>
        </PostsBlock>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)
