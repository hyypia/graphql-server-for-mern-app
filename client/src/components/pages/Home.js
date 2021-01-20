import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../../context/auth';
import { FETCH_POSTS_QUERY } from '../../utils/graphql';
import PostCard from '../PostCard';
import PostForm from '../PostForm';

function Home() {
  const { user } = useContext(AuthContext);
  let posts = '';
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (data) {
    posts = { data: data.getPosts };
  }

  return (
    <Grid columns={1} centered>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <Transition.Group>
            {posts.data &&
              posts.data.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
