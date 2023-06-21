import { defineType } from "sanity";
import { colorOptions, paddingBottom, paddingTop, primaryButton, secondaryButton, textAlign } from "../lib/classes";

export default defineType({
  title: 'Lead Form',
  name: 'leadForm',
  type: 'object',
  groups: [
    { title: 'Content', name: 'content' },
    { title: 'Settings', name: 'settings' },
  ],
  fields: [
    {
      title: 'Layout Type',
      name: 'layoutType',
      type: 'string',
      options: {
        list: [
          { title: 'One Column', value: 'oneColumn' },
          { title: 'Two Column', value: 'twoColumn' },
        ]
      },
      initialValue: "oneColumn"

    },
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
    primaryButton,
    secondaryButton,
    colorOptions,
    paddingTop,
    paddingBottom,
    {
      title: 'Form Builder',
      name: 'formBuilder',
      type: 'formBuilder'
    }
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content }) {
      const hasContent = content && content[0]?.children?.length > 0;

      return {
        title: hasContent ? content[0].children[0].text : 'Lead Form Section',
      };
    },
  },
})