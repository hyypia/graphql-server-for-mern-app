import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function PostCard({
  post: { id, username, body, createdAt, commentCount, likes, likeCount },
}) {
  const { user } = useContext(AuthContext);

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
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Button
          content="Comments"
          icon="comment"
          label={{ content: commentCount }}
          labelPosition="right"
          onClick={() => {}}
          as={Link}
          to={`/posts/${id}`}
        />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
