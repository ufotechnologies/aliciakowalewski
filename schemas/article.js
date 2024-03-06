export default {
  name: 'article',
  type: 'document',
  title: 'Project',
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
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'featuredImage',
      type: 'object',
      title: 'Featured Image',
      fields: [
        {name: 'image', type: 'image', title: 'Image'},
        {name: 'label', type: 'string', title: 'Label'},
        {name: 'caption', type: 'string', title: 'Caption'}
      ],
      preview: {
        select: {
          title: 'label',
          caption: 'caption'
        },
        prepare(selection) {
          const {title, caption} = selection
          return {
            title: title || caption
          }
        }
      }
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: [
        {
          name: 'figure',
          type: 'object',
          title: 'Image/Video',
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'indent', type: 'boolean', title: 'Indent', initialValue: true},
            {name: 'image', type: 'image', title: 'Image'},
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'caption', type: 'string', title: 'Caption'},
            {name: 'mp4', type: 'string', title: 'MP4 link'},
            {name: 'link', type: 'string', title: 'Link'}
          ],
          preview: {
            select: {
              title: 'name',
              label: 'label',
              caption: 'caption',
              indent: 'indent'
            },
            prepare(selection) {
              const {title, label, caption, indent} = selection
              return {
                title: title || label || caption,
                subtitle: indent ? 'Indented' : ''
              }
            }
          }
        },
        {
          name: 'diptych',
          type: 'object',
          title: 'Diptych',
          fieldsets: [
            {name: 'figure1', title: 'Figure #1'},
            {name: 'figure2', title: 'Figure #2'}
          ],
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'indent', type: 'boolean', title: 'Indent', initialValue: true},
            {name: 'image1', type: 'image', title: 'Image', fieldset: 'figure1'},
            {name: 'label1', type: 'string', title: 'Label', fieldset: 'figure1'},
            {name: 'caption1', type: 'string', title: 'Caption', fieldset: 'figure1'},
            {name: 'link1', type: 'string', title: 'Link', fieldset: 'figure1'},
            {name: 'image2', type: 'image', title: 'Image', fieldset: 'figure2'},
            {name: 'label2', type: 'string', title: 'Label', fieldset: 'figure2'},
            {name: 'caption2', type: 'string', title: 'Caption', fieldset: 'figure2'},
            {name: 'link2', type: 'string', title: 'Link', fieldset: 'figure2'}
          ],
          preview: {
            select: {
              title: 'name',
              indent: 'indent'
            },
            prepare(selection) {
              const {title, indent} = selection
              return {
                title: title,
                subtitle: indent ? 'Indented' : ''
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
      subtitle: 'location',
      media: 'featuredImage.image'
    }
  }
}