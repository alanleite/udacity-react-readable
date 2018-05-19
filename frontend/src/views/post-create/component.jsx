import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Header, Comment, Image, Loader, Button, Label, Form } from 'semantic-ui-react'

const castDate = (d) => (new Date(d)).toDateString()

export default ({
  category,
  eTitle,
  eBody,
  loading,
  error,
  onChange,
  onSubmit
}) => {
  return (
    <Grid container>
      <Grid.Row>

        <Grid.Column width={4}>
          <Link to={`/`}>Show all posts</Link><br />
          <Link to={`/${category}`}>Show all posts in the same category</Link><br />
        </Grid.Column>

        <Grid.Column width={12}>
          <Form onSubmit={onSubmit}>
            <Header as='h3' dividing>Creating</Header>
            <Form.Field
              width={8}
              control={Form.Input}
              name='eTitle'
              label='Title'
              onChange={onChange} />
            <Form.Field
              width={8}
              control={Form.TextArea}
              name='eBody'
              label='Message'
              onChange={onChange} />
            <Button primary type='submit' content='Create' />
          </Form>
        </Grid.Column>

      </Grid.Row>
    </Grid>
  )
}
