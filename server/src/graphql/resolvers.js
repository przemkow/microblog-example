const { posts, users } = require('../db');
const { AuthenticationError, ForbiddenError } = require('apollo-server');
const { AuthService } = require('../services/AuthService');


// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
  // Post id, title and content can be ommited. Default apollo-server configuration will resolve these properties automatically
  Post: {
    id(obj, args, context, info) {
      return obj.id;
    },
    title(obj, args, context, info) {
      return obj.title;
    },
    content(obj, args, context, info) {
      return obj.content;
    },
    author(obj, args, context, info) {
      return users.find(user => user.id === obj.author);
    }
  },
  User :{
    posts(obj, args, context, info) {
      return  posts.filter(post => post.author === obj.id)
    }
  },
  Query: {
    getPosts(obj, args, context, info) {
      return posts;
    },
    getPost(obj, args, context, info) {
      return posts.find(post => post.id === args.id)
    },
    getHottestPost(obj, args, context, info) {
      return posts.reduce((prev, current) => {
        return prev.thumbsUp >= current.thumbsUp ? prev : current;
      })
    },
    getUsers(obj, args, context, info) {
      return users;
    },
    me(obj, args, context, info) {
      if(!context.user.id) {
        throw new ForbiddenError('You must be logged in');
      }
      return context.user;
    }
  },
  Mutation: {
    login(obj, { email, password }, context) {
      const user = users.find(user => user.email === email);
      if (!user) {
        throw new AuthenticationError(`User not found`);
      } else if (user.password !== password) {
        throw new AuthenticationError(`Wrong password`);
      } else {
        return {
          token: AuthService.getJwtToken(user),
          user,
        }
      }
    },
    addPost(obj, { title, content }, context, info) {
      if(!context.user.id) {
        throw new ForbiddenError('You must be logged in');
      }
      const lastPostId = parseInt((posts[posts.length - 1].id), 10);
      const newPostId =  (lastPostId + 1).toString();
      
      const newPost = {
        id: newPostId,
        title,
        content,
        author: context.user.id.toString(),
        thumbsUp: 0,
        thumbsDown: 0,
      };
      posts.push(newPost);
      return newPost;
    },
    voteUp(obj, args, context, info) {
      if(!context.user.id) {
        throw new ForbiddenError('You must be logged in');
      }

      const postToUpdate = posts.find(post => post.id === args.post);
      postToUpdate.thumbsUp = postToUpdate.thumbsUp + 1;

      return postToUpdate;
    },
    voteDown(obj, args, context, info) {
      if(!context.user.id) {
        throw new ForbiddenError('You must be logged in');
      }

      const postToUpdate = posts.find(post => post.id === args.post);
      postToUpdate.thumbsDown = postToUpdate.thumbsDown + 1;

      return postToUpdate;
    }
  },
};

module.exports = {
  resolvers
}
