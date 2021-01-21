import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  Card,
  Grid,
  Image,
  Button,
  Form,
  Popup,
  Loader,
} from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../../context/auth';
import LikeButton from '../LikeButton';
import DeleteButton from '../DeleteButton';

function SinglePost(props) {
  const { user } = useContext(AuthContext);

  const postId = props.match.params.postId;

  const [comment, setComment] = useState('');

  const { loading, error, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment('');
    },
    variables: { postId, body: comment },
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;
  if (loading) {
    postMarkup = (
      <Loader inverted size="big">
        Loading
      </Loader>
    );
  } else if (error) {
    postMarkup = <p>Oops, something went wrong..</p>;
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
    } = data.getPost;

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
                <Popup
                  content="Comment"
                  inverted
                  trigger={
                    <Button
                      content="Comments"
                      icon="comment"
                      label={{ content: commentCount }}
                      labelPosition="right"
                      onClick={() => {
                        console.log('Comments');
                      }}
                    />
                  }
                />
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <div className="form-post">
                    <Form onSubmit={createComment}>
                      <h4>Comment post:</h4>
                      <Form.Field>
                        <Form.Input
                          placeholder="Comment..."
                          type="text"
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <Button type="submit" disabled={comment.trim() === ''}>
                          Submit
                        </Button>
                      </Form.Field>
                    </Form>
                  </div>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
}

const CREATE_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

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
