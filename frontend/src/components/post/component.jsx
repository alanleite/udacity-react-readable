import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Item, Statistic, Label, Button, Grid } from 'semantic-ui-react'

const VotesContent = styled.div`
  min-width: 120;
  text-align: 'center';
`
const LabelsBlock = styled(Item.Extra)`
  padding-top: 20px !important;
`

const castDate = (d) => (new Date(d)).toDateString()

export default ({ post, postVoteUp, postVoteDown, postDelete }) => {
  const { title, body, author, timestamp, commentCount, voteScore, id, category } = post
  return (
    <Item>
      <Item.Image size='tiny' src={`https://api.adorable.io/avatars/169/${author}@adorable.png`} rounded />
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Meta>{author + ' - ' + castDate(timestamp)}</Item.Meta>
        <Item.Description>{body}</Item.Description>
        <LabelsBlock>
          <Label.Group>
            <Label content={`Total comments: ${commentCount}`} />
            <Label content='View' color='blue' as={Link} to={`/${category.name}/${id}`} />
            <Label content='Edit' color='blue' as={Link} to={`/${category.name}/${id}/edit`} />
            <Label content='Delete' color='blue' onClick={postDelete} style={{ cursor: 'pointer' }} />
          </Label.Group>
        </LabelsBlock>
      </Item.Content>
      <VotesContent>
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
      </VotesContent>
    </Item>
  )
}
