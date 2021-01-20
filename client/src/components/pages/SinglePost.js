import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Card, Grid, Image, Button } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../../context/auth';
import LikeButton from '../LikeButton';
import DeleteButton from '../DeleteButton';

function SinglePost(props) {
  const { user } = useContext(AuthContext);

  console.log(props);
  const postId = props.match.params.postId;
  console.log(postId);
  const {
    loading,
    error,
    data: { getPost },
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;
  if (loading) {
    postMarkup = <p>Loading..</p>;
  } else {
    const {
      id,
      username,
      createdAt,
      body,
      likes,
      likeCount,
      comments,
      commentCount,
    } = getPost;

    postMarkup = (
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              circular
              src="https://www.universeofsymbolism.com/images/zebra-2.jpg"
              size="small"
              floated="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Button
                  content="Comments"
                  icon="comment"
                  label={{ content: commentCount }}
                  labelPosition="right"
                  onClick={() => {
                    console.log('Comment');
                  }}
                />
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
      likes {
        username
      }
      likeCount
    }
  }
`;

export default SinglePost;
