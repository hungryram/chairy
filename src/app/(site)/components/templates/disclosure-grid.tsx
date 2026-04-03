'use client'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, motion } from 'framer-motion'
import ContentEditor from '../util/content-editor'
import HeaderSection from './header-section'

interface Props {
    disclosure: any;
    disclosureBackgroundColor: any;
    disclosureTextColor: any;
    disclosureContentColor: any;
    backgroundStyles: any;
    content: any;
    textAlign: string;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any;
    paddingTop: string;
    paddingBottom: string;
}

interface Block {
    _type: string;
    children?: BlockChild[];
}

interface BlockChild {
    text: string;
}

export default function DisclosureGrid({
    disclosure,
    disclosureBackgroundColor,
    disclosureTextColor,
    disclosureContentColor,
    backgroundStyles,
    content,
    textAlign,
    primaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryButtonStyle,
    paddingTop,
    paddingBottom,
}: Props) {
    const disclosures = Array.isArray(disclosure) ? disclosure : [];

    function toPlainText(blocks: Block[] | any = []): string {
        const safeBlocks = Array.isArray(blocks) ? blocks : [];

        return safeBlocks
            .map((block: Block) => {
                if (block._type !== 'block' || !block.children) {
                    return '';
                }
                return block.children.map((child: BlockChild) => child.text).join('');
            })
            .join('\n\n');
    }


    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": disclosures.map((node: any) => ({
            ...{
                "@type": "Question",
                "name": node?.heading || "",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": toPlainText(node?.content) || ""
                }
            }
        }))
    };

    const styles = {
        paddingTop: paddingTop ?? '5rem',
        paddingBottom: paddingBottom ?? '5rem',
      }
    
      const allStyles = { ...backgroundStyles, ...styles }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />
            <div style={allStyles}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <div className="lg:col-span-5">
                            {(content || primaryButtonLink || secondaryButtonLink) && (
                                <HeaderSection
                                    content={content}
                                    textAlign={textAlign}
                                    // PRIMARY
                                    buttonLink={primaryButtonLink}
                                    primaryButtonText={primaryButtonText}
                                    primaryButtonStyle={primaryButtonStyle}
                                    // SECONDARY
                                    secondaryButtonLink={secondaryButtonLink}
                                    secondaryButtonText={secondaryButtonText}
                                    secondaryButtonStyle={secondaryButtonStyle}
                                />
                            )}
                        </div>
                        <div className={` ${content && 'mt-16'}`}>
                            {disclosures.map((node: any) => {
                                return (
                                    <motion.div
                                        className="w-full"
                                        key={node._key}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.35, ease: 'easeOut' }}
                                    >
                                        <div className="mx-auto w-full md:max-w-2xl rounded-2xl p-2">
                                            <Disclosure>
                                                {({ open }) => (
                                                    <>
                                                        <Disclosure.Button className="flex w-full justify-between rounded-md px-4 py-2 text-left" style={{
                                                            background: `${disclosureBackgroundColor?.hex ?? 'transparent'}`,
                                                            color: `${disclosureTextColor?.hex ?? '#fff'}`
                                                        }}>
                                                            {node?.heading && <span className={open ? 'gradient-accent' : ''}>{node.heading}</span>}
                                                            <ChevronUpIcon
                                                                className={`${open ? 'rotate-180' : ''
                                                                    } h-5 w-5 transform transition-transform duration-300`}
                                                                style={{
                                                                    color: `${disclosureTextColor?.hex ?? '#fff'}`
                                                                }}
                                                            />
                                                        </Disclosure.Button>
                                                        <AnimatePresence initial={false}>
                                                            {open && (
                                                                <Disclosure.Panel static as="div">
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: 'auto', opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                                                                        className="overflow-hidden"
                                                                    >
                                                                        <div className="px-4 pt-4 pb-2 font-thin!" style={{
                                                                            color: `${disclosureContentColor?.hex ?? '#000000'}`
                                                                        }}>
                                                                            {node.content &&
                                                                                <ContentEditor
                                                                                    content={node.content}
                                                                                />
                                                                            }
                                                                        </div>
                                                                    </motion.div>
                                                                </Disclosure.Panel>
                                                            )}
                                                        </AnimatePresence>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}
