export default {
  name: 'settings',
  type: 'document',
  title: 'Settings',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'shareImage',
      type: 'image',
      title: 'Share image'
    }
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
