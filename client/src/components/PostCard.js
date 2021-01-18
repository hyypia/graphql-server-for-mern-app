import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';
import moment from 'moment';

function PostCard({
  post: { id, username, body, createdAt, commentCount, likes, likeCount },
}) {
  const likePost = () => {
    console.log('like');
  };

  const commentOnPost = () => {
    console.log('comment');
  };
  return (
    <Card centered style={{ width: 600 }}>
      <Card.Content>
        <Image
          circular
          floated="left"
          size="mini"
          src="https://www.universeofsymbolism.com/images/zebra-2.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          content="Like"
          icon="heart"
          label={{ as: 'a', basic: true, content: likeCount }}
          labelPosition="right"
          onClick={likePost}
        />
        <Button
          content="Comments"
          icon="comment"
          label={{ as: 'a', basic: true, content: commentCount }}
          labelPosition="right"
          onClick={commentOnPost}
        />
      </Card.Content>
    </Card>
  );
}

export default PostCard;
