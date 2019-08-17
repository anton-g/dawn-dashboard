export default [
  {
    type: 'demo',
    name: 'Demo',
    description: 'A demo widget with a customizable title',
    settings: {
      title: {
        name: 'Title',
        type: 'text',
        required: true
      }
    },
    defaultLayout: {
      x: 0,
      y: 0,
      w: 1,
      h: 1
    }
  },
  {
    type: 'reddit-subreddit',
    name: 'Reddit: Subreddit',
    description: 'Latest posts from a Reddit subreddit',
    settings: {
      subredditName: {
        name: 'Subreddit name',
        type: 'text',
        required: true
      }
    },
    defaultLayout: {
      x: 0,
      y: 0,
      w: 3,
      h: 2,
      minH: 2,
      minW: 3
    }
  }
]
