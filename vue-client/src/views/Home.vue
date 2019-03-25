<template>
  <div>
    <div class="row">
      <div class="col-4">
        <h5>Hottest Post</h5>
        <span v-if="$apollo.queries.hottestPost.loading">
          Loading...
        </span>
        <post-card v-else
            :title="hottestPost.title"
            :author="hottestPost.author.email"
            :content="hottestPost.content"
            :thumbs-down="hottestPost.thumbsDown"
            :thumbs-up="hottestPost.thumbsUp"
            @voteUp="voteUp(hottestPost.id)"
            @voteDown="voteDown(hottestPost.id)">
        </post-card>
      </div>
      <div class="col">
        <post-card  v-for="post in posts"
            :key="post.id"
            :title="post.title"
            :author="post.author.email"
            :content="post.content"
            :thumbs-down="post.thumbsDown"
            :thumbs-up="post.thumbsUp"
            @voteUp="voteUp(post.id, post.thumbsUp)"
            @voteDown="voteDown(post.id)">
        </post-card>
        <post-form @submitForm="addNewPost">
        </post-form>
      </div>
    </div>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard.vue';
import PostForm from '@/components/PostForm.vue';
import GetPostsQuery from '@/graphql/GetPosts.graphql';
import GetHottestPostQuery from '@/graphql/GetHottestPost.graphql';
import VoteUpMutation from '@/graphql/VoteUp.graphql';
import VoteDownMutation from '@/graphql/VoteDown.graphql';
import AddPostMutation from '@/graphql/AddPost.graphql';

export default {
  name: 'home',
  components: {
    PostCard,
    PostForm,
  },
  apollo: {
    posts: {
      query: GetPostsQuery,
      update(data) {
        return data.getPosts;
      },
    },
    hottestPost: {
      query: GetHottestPostQuery,
      update(data) {
        return data.getHottestPost;
      },
    },
  },
  methods: {
    voteUp(postId, thumbsUp) {
      this.$apollo.mutate({
        mutation: VoteUpMutation,
        optimisticResponse: {
          voteUp: {
            __typename: 'Post',
            id: postId,
            thumbsUp: thumbsUp + 1,
          },
        },
        variables: {
          postId,
        },
      });
    },
    voteDown(postId) {
      this.$apollo.mutate({
        mutation: VoteDownMutation,
        variables: {
          postId,
        },
      });
    },
    addNewPost(form) {
      this.$apollo.mutate({
        mutation: AddPostMutation,
        variables: {
          title: form.title,
          content: form.content,
        },
        update: (store, { data: { addPost } }) => {
          const data = store.readQuery({ query: GetPostsQuery });
          data.getPosts.push(addPost);
          store.writeQuery({ query: GetPostsQuery, data });
        },
      });
    },
  },
};
</script>
