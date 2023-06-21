import { defineType } from "sanity";
import { colorOptions, paddingBottom, paddingTop, primaryButton, secondaryButton, textAlign } from "../lib/classes";

export default defineType({
    title: 'Featured Grid',
    name: 'featuredGrid',
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
                    { title: 'Grid with Icon', value: 'featuredGridIcon' },
                    { title: 'Grid with Colored Containers', value: 'featuredBox' },
                    { title: 'Grid with Image and Text Outside', value: 'gridWithImageOutside' },
                    { title: 'Grid with Image and Text Inside', value: 'gridWithTextInside' },
                ]
            },
            initialValue: "featuredGridIcon"

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
        {
            title: 'Blocks',
            name: 'blocks',
            type: 'array',
            group: 'content',
            of: [
                {
                    title: 'Blocks',
                    type: 'object',
                    fields: [
                        {
                            title: 'Image',
                            name: 'image',
                            type: 'image',
                            description: 'Image will take priority over icon'
                        },
                        {
                            title: 'Heading',
                            name: 'value',
                            type: 'string'
                        },
                        {
                            title: 'Content',
                            name: 'content',
                            type: 'text',
                        },
                        {
                            title: 'Icon',
                            name: 'icon',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Bell', value: 'BellIcon' },
                                    { title: 'Chat Bubble', value: 'ChatBubbleLeftRightIcon' },
                                    { title: 'Code', value: 'CodeBracketIcon' },
                                    { title: 'Cog', value: 'Cog6ToothIcon' },
                                    { title: 'Computer', value: 'ComputerDesktopIcon' },
                                    { title: 'Corporate Building', value: 'BuildingOfficeIcon' },
                                    { title: 'Credit Card', value: 'CreditCardIcon' },
                                    { title: 'Cube', value: 'CubeIcon' },
                                    { title: 'Document', value: 'DocumentIcon' },
                                    { title: 'Duplicate Document', value: 'DocumentDuplicateIcon' },
                                    { title: 'Envelope', value: 'EnvelopeIcon' },
                                    { title: 'Globe', value: 'GlobeAltIcon' },
                                    { title: 'Heart', value: 'HeartIcon' },
                                    { title: 'Home', value: 'HomeIcon' },
                                    { title: 'Key', value: 'KeyIcon' },
                                    { title: 'Map Pin', value: 'MapPinIcon' },
                                    { title: 'Mobile Phone', value: 'DevicePhoneMobileIcon' },
                                    { title: 'Photo', value: 'PhotoIcon' },
                                    { title: 'Question Mark', value: 'QuestionMarkCircleIcon' },
                                    { title: 'Shopping Bag', value: 'ShoppingBagIcon' },
                                    { title: 'Thunder', value: 'BoltIcon' },
                                    { title: 'Users', value: 'UsersIcon' },
                                    { title: 'Wallet', value: 'WalletIcon' },
                                ]
                            },
                        },
                        {
                            title: 'Button',
                            name: 'button',
                            type: 'links',
                        },
                        {
                            title: 'Heading Color',
                            name: 'headingColor',
                            type: 'color',
                        },
                        {
                            title: 'Content Color',
                            name: 'contentColor',
                            type: 'color',
                        },
                        {
                            title: 'Icon Color',
                            name: 'iconColor',
                            type: 'color',
                        },
                        {
                            title: 'Link Color',
                            name: 'linkColor',
                            type: 'color',
                        }
                    ]
                }
            ]
        },
        {
            title: 'Number of Columns',
            name: 'columnNumber',
            type: 'number',
            validation: Rule => Rule.min(1).max(4),
            group: 'settings'
        },
        {
            title: 'Grid Background Color',
            name: 'gridBackgroundColor',
            type: 'color',
            options: {
                disableAlpha: true
            },
            hidden: ({parent}) => parent?.layoutType !== 'featuredBox',
            group: 'settings'
        },
        {
            title: 'Offset Top',
            name: 'offsetTop',
            type: 'boolean',
            description: 'This makes the section overlay any top section.',
            hidden: ({parent}) => parent?.layoutType !== 'featuredBox',
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
                title: hasContent ? content[0].children[0].text : 'Featured Grid Section',
            };
        },
    },
})