import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Header, Comment, Image, Loader, Button, Label, Form, Statistic, Container } from 'semantic-ui-react'

const castDate = (d) => (new Date(d)).toDateString()

export default ({
  editing,
  editingComment,
  eEditingComment,
  post,
  comments = [],
  eTitle,
  eBody,
  eComment,
  initialized,
  loading,
  error,
  onSubmitEdit,
  onSubmitComment,
  onChange,
  commentVoteUp,
  commentVoteDown,
  onPostDelete,
  onCommentDelete,
  postVoteUp,
  postVoteDown,
  onCommentEdit
}) => {
  if (loading) return <Loader active />
  if (!post) {
    return (
      <Container>
        <h3>Post not found</h3>
        <Link to={`/`}>Show all posts</Link><br />
      </Container>
    )
  }

  const { id, author, title, body, category, voteScore } = post

  return (
    <Grid container>
      <Grid.Row>

        <Grid.Column width={4}>
          <Image src={`https://api.adorable.io/avatars/169/${author}@adorable.png`} />
          <h4>{author}</h4>
          <Link to={`/`}>Show all posts</Link><br />
          <Link to={`/${category.path}`}>Show all posts in the same category</Link><br />
          <Link to={`/${category.path}/${id}/edit`}>Edit this post</Link><br />
          <a href='#' onClick={onPostDelete}>Delete this post</a>
        </Grid.Column>

        <Grid.Column width={12}>

          {!editing && (
            <Grid>
              <Grid.Column width={12}>
                <Header as='h3' dividing>{title}</Header>
                <p style={{ fontSize: 20 }}>{body}</p>
              </Grid.Column>
              <Grid.Column width={4}>
                <Grid textAlign='center'>
                  <Grid.Row stretched>
                    <Statistic>
                      <Statistic.Value>{voteScore}</Statistic.Value>
                      <Statistic.Label>Votes</Statistic.Label>
                    </Statistic>
                  </Grid.Row>
                  <Grid.Row>
                    <Button.Group basic size='tiny'>
                      <Button icon='thumbs outline up' onClick={postVoteUp} />
                      <Button icon='thumbs outline down' onClick={postVoteDown} />
                    </Button.Group>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid>
          )}

          {editing && initialized && (
            <Form onSubmit={onSubmitEdit}>
              <Header as='h3' dividing>Editing</Header>
              <Form.Field label='Title' control={Form.Input} name='eTitle' value={eTitle} onChange={onChange} />
              <Form.Field label='Message' control={Form.TextArea} name='eBody' value={eBody} onChange={onChange} />
              <Button primary type='submit' content='Save' />
            </Form>
          )}

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
                  { editingComment !== c.id
                    ? <Comment.Text style={{ fontSize: 16 }}>{c.body}</Comment.Text>
                    : (
                      <Form style={{ paddingBottom: 20 }}>
                        <Form.Field
                          width={8}
                          control={Form.TextArea}
                          name='eEditingComment'
                          value={eEditingComment}
                          onChange={onChange} />
                      </Form>
                    )
                  }
                  <Comment.Metadata>
                    <Label.Group size='small'>
                      <Label basic content='Vote score: ' detail={c.voteScore} />
                      <Label
                        basic
                        as='a'
                        color='blue'
                        content='Like'
                        onClick={() => { commentVoteUp(c.id) }} />
                      <Label
                        basic
                        as='a'
                        color='blue'
                        content='Dislike'
                        onClick={() => { commentVoteDown(c.id) }} />
                      <Label
                        basic={editingComment !== c.id}
                        as='a'
                        color='blue'
                        content={editingComment === c.id ? 'Salvar' : 'Editar'}
                        onClick={() => { onCommentEdit(c.id) }} />
                      <Label
                        basic
                        as='a'
                        color='red'
                        content='Delete'
                        onClick={() => { onCommentDelete(c.id) }} />
                    </Label.Group>
                  </Comment.Metadata>
                </Comment.Content>
              </Comment>
            ))}
          </Comment.Group>

          {!editing && (
            <Form onSubmit={onSubmitComment}>
              <Form.Field width={8} control={Form.TextArea} name='eComment' label='Message' value={eComment} onChange={onChange} />
              <Button primary type='submit' content='Reply' />
            </Form>
          )}

        </Grid.Column>

      </Grid.Row>
    </Grid>
  )
}
