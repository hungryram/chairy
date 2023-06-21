import ContentEditor from "../util/content-editor"
import HeaderSection from "./header-section";

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

export default function DisclosureSeparate({
    disclosure,
    disclosureContentColor,
    disclosureTextColor,
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
    backgroundStyles
}: Props) {

    const styles = {
        paddingTop: paddingTop ?? '5rem',
        paddingBottom: paddingBottom ?? '5rem',
      }
    
      const allStyles = { ...backgroundStyles, ...styles }

    return (
        <div style={allStyles}>
            <div className="container">
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
                <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
                    {disclosure.map((node: any, i: number) => (
                        <div key={i} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
                            <dt className="text-base font-semibold leading-7 lg:col-span-5" style={{
                                color: `${disclosureTextColor?.hex ?? '#000000'}`
                            }}>{node.heading}</dt>
                            <dd className="mt-4 lg:col-span-7 lg:mt-0" style={{
                                color: `${disclosureContentColor?.hex ?? '#000000'}`
                            }}>
                                {node.content &&
                                    <ContentEditor
                                        content={node.content}
                                    />
                                }
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}
