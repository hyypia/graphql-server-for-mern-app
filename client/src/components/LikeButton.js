import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button } from 'semantic-ui-react';

function LikeButton({ user, post: { id, likes, likeCount } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  return (
    <>
      {user ? (
        liked ? (
          <Button
            content="Like"
            icon={{ name: 'heart', color: 'red' }}
            label={{ content: likeCount }}
            labelPosition="right"
            onClick={likePost}
          />
        ) : (
          <Button
            content="Like"
            icon="heart"
            label={{ content: likeCount }}
            labelPosition="right"
            onClick={likePost}
          />
        )
      ) : (
        <Button
          content="Like"
          icon="heart"
          label={{ content: likeCount }}
          as={Link}
          to="/login"
          labelPosition="right"
          onClick={likePost}
        />
      )}
    </>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
