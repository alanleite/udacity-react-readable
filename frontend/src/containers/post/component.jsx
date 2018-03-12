import React from 'react'
import { Item, Statistic, Label } from 'semantic-ui-react'

const castDate = (d) => (new Date(d)).toDateString()

const styles ={
    statistic: { minWidth: 120, textAlign: 'center' }
}

export default ({
    body, author, timestamp, commentCount, voteScore
}) => (
        <Item>
            <div style={styles.statistic}>
                <Statistic>
                    <Statistic.Value>{voteScore}</Statistic.Value>
                    <Statistic.Label>Votes</Statistic.Label>
                </Statistic>
            </div>
            <Item.Content>
                <Item.Header>{author}</Item.Header>
                <Item.Meta>{castDate(timestamp)}</Item.Meta>
                <Item.Description>{body}</Item.Description>
                <Item.Extra>
                    <Label.Group>
                        <Label content="Vote Up" />
                        <Label content="Vote Down" />
                        <Label content={`Total comments: ${commentCount}`} />
                        <Label content="Write a Comment" color="blue" />
                    </Label.Group>
                </Item.Extra>
            </Item.Content>
        </Item>
    )