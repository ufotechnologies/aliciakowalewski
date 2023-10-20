export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name'
      }
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
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: [
        {
          name: 'project',
          type: 'reference',
          title: 'Project',
          to: [
            {type: 'article'}
          ]
        },
        {
          name: 'section',
          type: 'object',
          title: 'Section',
          fields: [
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'description', type: 'text', title: 'Description'}
          ],
          preview: {
            select: {
              title: 'heading',
              description: 'description'
            },
            prepare(selection) {
              const {title, description} = selection
              return {
                title: title || description
              }
            }
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
    }
  }
}
