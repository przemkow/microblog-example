import React from 'react';
import {Query, compose, graphql, Mutation} from "react-apollo";
import { getHottestPost, getPosts } from "../graphql/queries";
import PostCard from "../components/PostCard";
import {addPost, voteDown, voteUp} from "../graphql/mutations";
import PostForm from "../components/PostForm";

function Home(props) {
  return (
    <div>
      <div className="row">
        <div className="col-4">
          <h5>Hottest Post</h5>
          <Query query={getHottestPost}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              const post = data.getHottestPost;
              return(
                <PostCard
                  title={post.title}
                  author={post.author.email}
                  content={post.content}
                  thumbsDown={post.thumbsDown}
                  thumbsUp={post.thumbsUp}
                  thumbsUpClick={() => props.voteUp({
                    variables: {
                      postId: post.id
                    }
                  })}
                  thumbsDownClick={() => props.voteDown({
                    variables: {
                      postId: post.id
                    }
                  })}>
                </PostCard>)
            }}
          </Query>
        </div>
        <div className="col">
          <Query query={getPosts}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              return data.getPosts.map((post) => (
                <PostCard
                  key={post.id}
                  title={post.title}
                  author={post.author.email}
                  content={post.content}
                  thumbsDown={post.thumbsDown}
                  thumbsUp={post.thumbsUp}
                  thumbsUpClick={() => props.voteUp({
                    variables: {
                      postId: post.id
                    },
                    optimisticResponse: {
                      voteUp: {
                        __typename: 'Post',
                        id: post.id,
                        thumbsUp: post.thumbsUp + 1,
                      },
                    },
                  })}
                  thumbsDownClick={() => props.voteDown({
                    variables: {
                      postId: post.id
                    }
                  })}>
                </PostCard>
              ));
            }}
          </Query>
          <Mutation mutation={addPost}
            update={(cache, { data: { addPost } }) => {
              const data = cache.readQuery({ query: getPosts });
              data.getPosts.push(addPost);
              cache.writeQuery({ query: getPosts, data });
            }}>
            {addPost => (
              <PostForm
                formSubmit={
                  (newPost) => addPost({
                    variables: newPost
                  })
                }
              >
              </PostForm>
            )}
          </Mutation>
        </div>
      </div>
    </div>
  );
}

export default compose(
  graphql(voteUp, { name: 'voteUp' }),
  graphql(voteDown, { name: 'voteDown' })
)(Home);
