import Image from "next/image";
import Styles from "./feature-section.module.css"
import HeaderSection from "./header-section";
import Link from "next/link";

interface Props {
    backgroundStyles: any;
    columnNumber: number;
    blocks: any;
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

export default function FeaturedGridImageTextOutside({
    backgroundStyles,
    columnNumber,
    blocks,
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
                <div className={Styles.featureGridWrap}>
                    <div className={`${Styles.featureGridContainer} grid grid-cols-1 lg:grid-cols-${columnNumber} ${content && 'mt-16'}`}>
                        {blocks?.map((node: any) => {

                            const blockLink: any = node?.blockLinking?.internalLink
                            const linkUrl =
                                (blockLink?._type === "pages" && `/${node.blockLinking?.internalLink.slug}`) ||
                                (blockLink?._type === "blog" && `/blog/${node.blockLinking?.internalLink.slug}`) ||
                                (blockLink?._type === "legal" && `/legal/${node.blockLinking?.internalLink.slug}`) ||
                                (blockLink?._type === "services" && `/services/${node.blockLinking?.internalLink.slug}`) ||
                                (blockLink?._type === "team" && `/team/${node.blockLinking?.internalLink.slug}`) ||
                                (blockLink?._type === "team" && `/team/${node.blockLinking?.internalLink.slug}`) ||
                                (node.blockLinking?.externalUrl && `${node.blockLinking?.externalUrl}`);

                            return (
                                <div key={node._key}>
                                    {node?.image?.asset?.url &&
                                        <div className="relative w-full h-96">
                                            <Image
                                                src={node?.image?.asset?.url}
                                                fill={true}
                                                alt={node?.image?.asset?.altText}
                                                className="w-full rounded-sm object-cover"
                                                placeholder={node?.image?.asset?.lqip ? 'blur' : 'empty'}
                                                blurDataURL={node?.image?.asset?.lqip}
                                            />
                                        </div>
                                    }
                                    <div className={Styles.featureCardContent}>
                                        {node?.value &&
                                            <h3 className={`${Styles.featureCard} mb-4`} style={{
                                                color: node?.headingColor?.hex
                                            }}>{node.value}</h3>
                                        }

                                        <div style={{
                                            color: node?.contentColor?.hex
                                        }}>{node.content}</div>
                                        {node?.button?.text &&
                                            <p className="mt-6">
                                                <Link href={linkUrl ?? '/'} className={`${Styles.featureCardCta}`} aria-label={`Link to ${node?.value}`} style={{
                                                    color: node?.linkColor?.hex
                                                }}>
                                                    {node?.button?.text} <span aria-hidden="true">→</span>
                                                </Link>
                                            </p>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
