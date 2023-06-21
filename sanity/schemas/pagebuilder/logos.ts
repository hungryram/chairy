import { defineType } from "sanity";
import { colorOptions, paddingBottom, paddingTop, textAlign } from "../lib/classes";

export default defineType({
  title: 'Logos',
  name: 'logos',
  type: 'object',
  groups: [
    { title: 'Content', name: 'content' },
    { title: 'Settings', name: 'settings' },
  ],
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'contentEditor',
      group: 'content'
    },
    {
      title: 'Text Align',
      name: 'textAlign',
      type: 'string',
      options: {
        list: textAlign
      },
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          title: 'Image',
          name: 'image',
          type: 'image',
        }
      ],
      options: {
        layout: 'grid',
      },
    },
    colorOptions,
    paddingTop,
    paddingBottom,
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content }) {
      const hasContent = content && content[0]?.children?.length > 0;

      return {
        title: hasContent ? content[0].children[0].text : 'Logos Section',
      };
    },
  },
})