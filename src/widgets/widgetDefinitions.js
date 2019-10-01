export default [
  {
    type: 'reddit',
    name: 'Reddit',
    description: 'Latest posts from a Reddit subreddit',
    settings: {
      subredditName: {
        name: 'Subreddit name',
        type: 'text',
        required: true
      },
      sort: {
        name: 'Sort order',
        type: 'select',
        options: [
          {
            value: 'new',
            name: 'New',
            default: true
          },
          {
            value: 'top',
            name: 'Top'
          }
        ],
        required: true
      },
      time: {
        name: 'Time span',
        type: 'select',
        options: [
          {
            value: 'day',
            name: 'Day',
            default: true
          },
          {
            value: 'week',
            name: 'Week'
          },
          {
            value: 'month',
            name: 'Month'
          },
          {
            value: 'year',
            name: 'Year'
          }
        ],
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
  },
  {
    type: 'rss',
    name: 'RSS',
    description: 'RSS desc',
    settings: {
      url: {
        name: 'RSS URL',
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
