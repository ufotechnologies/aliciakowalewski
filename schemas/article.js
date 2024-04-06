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
      name: 'thumbnailImage',
      type: 'object',
      title: 'Thumbnail Image',
      fields: [
        {name: 'image', type: 'image', title: 'Image'}
      ]
    },
    {
      name: 'featuredImage',
      type: 'object',
      title: 'Featured Image',
      fields: [
        {name: 'image', type: 'image', title: 'Image'},
        {
          name: 'layers',
          type: 'array',
          title: 'Layers',
          of: [
            {
              name: 'parallaxImage',
              type: 'object',
              title: 'Parallax Image',
              fields: [
                {name: 'image', type: 'image', title: 'Image'}
              ],
              preview: {
                select: {
                  media: 'image'
                },
                prepare(selection) {
                  const {media} = selection
                  return {
                    title: 'Parallax image',
                    media: media
                  }
                }
              }
            }
          ]
        }
      ]
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
              indent: 'indent',
              media: 'image'
            },
            prepare(selection) {
              const {title, label, caption, indent, media} = selection
              return {
                title: title || label || caption,
                subtitle: indent ? 'Indented' : 'Full width',
                media: media
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
              label: 'label1',
              caption: 'caption1',
              indent: 'indent',
              media: 'image1'
            },
            prepare(selection) {
              const {title, label, caption, indent, media} = selection
              return {
                title: title || label || caption,
                subtitle: indent ? 'Indented' : 'Full width',
                media: media
              }
            }
          }
        },
        {
          name: 'slider',
          type: 'object',
          title: 'Slider',
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {
              name: 'images',
              type: 'array',
              title: 'Images',
              of: [
                {
                  name: 'figure',
                  type: 'object',
                  title: 'Image/Video',
                  fields: [
                    {name: 'name', type: 'string', title: 'Name'},
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
                      media: 'image'
                    },
                    prepare(selection) {
                      const {title, label, caption, media} = selection
                      return {
                        title: title || label || caption,
                        media: media
                      }
                    }
                  }
                }
              ]
            },
          ],
          preview: {
            select: {
              title: 'name',
              media: 'images[0].image'
            },
            prepare(selection) {
              const {title, media} = selection
              return {
                title: title,
                subtitle: 'Slider',
                media: media
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
      thumbnailImage: 'thumbnailImage.image',
      featuredImage: 'featuredImage.image'
    },
    prepare(selection) {
      const {title, thumbnailImage, featuredImage} = selection
      return {
        title: title,
        media: thumbnailImage || featuredImage
      }
    }
  }
}
