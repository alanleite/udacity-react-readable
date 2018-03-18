import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Header, Comment, Image, Loader, Statistic, Button, Label } from 'semantic-ui-react'
import styled from 'styled-components'

const castDate = (d) => (new Date(d)).toDateString()

const VotesContent = styled.div`
  min-width: 120;
  text-align: 'center';
`

export default ({
  loading, error, deletePost,
  post, comments = []
}) => {

  if (loading) {
    return <Loader active={true} />
  }
  else {

    const { id, author, body, category } = post

    return (
      <Grid container>
        <Grid.Row>

          <Grid.Column width={4}>
            <Image src={`https://api.adorable.io/avatars/169/${author}@adorable.png`} />
            <h4>{author}</h4>
            <Link to={`/`}>Show all posts</Link><br/>
            <Link to={`/${category.name}`}>Show all posts in the same category</Link><br/>
            <Link to={`/${category.name}/create-post`}>Create a new post in the same category</Link><br/>
            <Link to={`/${category.name}/${id}/edit`}>Edit this post</Link><br/>
            <a onClick={deletePost}>Delete this post</a>
          </Grid.Column>

          <Grid.Column width={12}>

            <Header as='h4' dividing>Message</Header>

            <p>{body}</p>

            <Header as='h4' dividing>Comments</Header>

            <Comment.Group>
              {comments.map((c, i) => (
                <Comment key={i}>
                  <Comment.Avatar src={`https://api.adorable.io/avatars/169/${c.author}@adorable.png`} />
                  <Comment.Content>
                    <Comment.Author as='a'>{c.author}</Comment.Author>
                    <Comment.Metadata>
                      <div>{castDate(c.timestamp)}</div>
                    </Comment.Metadata>
                    <Comment.Text>{c.body}</Comment.Text>
                    <Comment.Metadata>
                      <Label.Group>
                        <Label basic content="Vote score: " detail={c.voteScore} />
                        <Label basic icon="thumbs outline up" content="Like" />
                        <Label basic icon="thumbs outline down" content="Dislike" />
                      </Label.Group>
                    </Comment.Metadata>
                  </Comment.Content>
                </Comment>
              ))}
            </Comment.Group>

          </Grid.Column>

        </Grid.Row>
      </Grid>
    )

  }

}