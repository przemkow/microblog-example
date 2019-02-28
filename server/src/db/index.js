// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const posts = [
  {
    id: '1',
    title: 'The Story Of Book As Told In 10 Photos',
    content: 'Conent',
    author: '1',
    thumbsUp: 5,
    thumbsDown: 1

  },
  {
    id: '2',
    title: '7 Ways To Learn GraphQL Effectively.',
    content: 'content 2',
    author: '1',
    thumbsUp: 4,
    thumbsDown: 0
  },
];

const users = [
  {
    id: '1',
    email: 'test@email.com',
    password: '1234'
  },
];

module.exports = {
  posts,
  users,
}
