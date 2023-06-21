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

export default function FeaturedGridImageTextInside({
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
                                <div className="relative isolate flex flex-col bg-black justify-end overflow-hidden rounded-sm px-8 pb-8 pt-80 sm:pt-48 lg:pt-80" key={node._key}>
                                    {node?.image?.asset?.url ?
                                        <Image
                                            src={node?.image?.asset?.url}
                                            alt={node?.image?.asset?.altText}
                                            placeholder={node?.image?.asset?.lqip ? 'blur' : 'empty'}
                                            blurDataURL={node?.image?.asset?.lqip}
                                            className="absolute inset-0 -z-10 h-full w-full object-cover"
                                            width={800}
                                            height={800}
                                        />
                                        :
                                        <div className="w-full h-full"></div>
                                    }
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                                    <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                    {node?.value &&
                                        <h3 className={`${Styles.featureCard} mb-4`} style={{
                                            color: node?.headingColor?.hex
                                        }}>{node.value}</h3>
                                    }
                                    <div >
                                        <p style={{
                                            color: node?.contentColor?.hex
                                        }}>
                                            {node.content}
                                        </p>
                                    </div>
                                    {node?.button?.text &&
                                        <Link href={linkUrl ?? '/'} className="absolute inset-0" aria-label={`Link to ${node?.value}`} style={{
                                            color: node?.linkColor?.hex
                                        }}>
                                            <span className="sr-only">{node?.button?.text}</span>
                                        </Link>
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
