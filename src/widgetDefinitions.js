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
    defaultAppearance: {
      x: 0,
      y: 0,
      w: 3,
      h: 2
    }
  }
]
