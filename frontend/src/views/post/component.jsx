import React from 'react'
import { Header, Comment } from 'semantic-ui-react'

export default ({ id }) => (
  <Comment.Group>
    <Header as='h4' dividing>Comments</Header>
    <Comment>
      <Comment.Avatar src={`https://api.adorable.io/avatars/169/${id}@adorable.png`} />
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>How artistic!</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  </Comment.Group>
)
