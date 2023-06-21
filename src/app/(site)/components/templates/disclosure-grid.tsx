'use client'
import { Disclosure } from '@headlessui/react'
import { FiChevronUp } from 'react-icons/fi'
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

    function toPlainText(blocks: Block[] = []): string {
        return blocks
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
        "mainEntity": disclosure?.map((node: any) => ({
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
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
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
                        <div className={`lg:col-span-7 ${content && 'mt-16'}`}>
                            {disclosure?.map((node: any) => {
                                return (
                                    <div className="w-full" key={node._key}>
                                        <div className="mx-auto w-full md:max-w-2xl rounded-2xl p-2">
                                            <Disclosure>
                                                {({ open }) => (
                                                    <>
                                                        <Disclosure.Button className="flex w-full justify-between rounded-md px-4 py-2 text-left" style={{
                                                            background: `${disclosureBackgroundColor?.hex ?? 'var(--primary-button-background)'}`,
                                                            color: `${disclosureTextColor?.hex ?? 'var(--primary-button-text)'}`
                                                        }}>
                                                            {node?.heading && <span>{node.heading}</span>}
                                                            <FiChevronUp
                                                                className={`${open ? 'rotate-180 transform' : ''
                                                                    } h-5 w-5`}
                                                                style={{
                                                                    color: `${disclosureTextColor?.hex ?? 'var(--primary-button-text)'}`
                                                                }}
                                                            />
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="px-4 pt-4 pb-2" style={{
                                                            color: `${disclosureContentColor?.hex ?? '#000000'}`
                                                        }}>
                                                            {node.content &&
                                                                <ContentEditor
                                                                    content={node.content}
                                                                />
                                                            }
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
