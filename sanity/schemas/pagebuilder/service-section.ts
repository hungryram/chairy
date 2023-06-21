import { defineType } from "sanity";
import { colorOptions, paddingBottom, paddingTop, primaryButton, secondaryButton, textAlign } from "../lib/classes";
// UPDATED FEATURES
export default defineType({
    title: 'Services Display',
    name: 'servicesDisplay',
    type: 'object',
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'settings', title: 'Settings' },
    ],
    fields: [
        {
            title: "Layout Type",
            name: "layoutType",
            type: "string",
            options: {
                list: [
                    { title: "No Featured Image", value: "noImage" },
                    { title: "Grid with Image", value: "gridWithImage" },
                ],
            },
        },
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor',
            group: 'content',
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
            title: "Number of Columns",
            name: "columnNumber",
            type: "string",
            options: {
                list: [
                    { title: "1", value: "grid-cols-1 max-w-3xl" },
                    { title: "2", value: "lg:grid-cols-2" },
                    { title: "3", value: "lg:grid-cols-3" },
                    { title: "4", value: "lg:grid-cols-4 md:grid-cols-2" },
                ],
            },
        },
        primaryButton,
        secondaryButton,
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
                title: hasContent ? content[0].children[0].text : 'Services Section',
            };
        },
    },

})
