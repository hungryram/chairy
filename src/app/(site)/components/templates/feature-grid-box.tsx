import Styles from "./feature-section.module.css"
import * as HeroIcons from '@heroicons/react/24/outline';
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
    gridBackgroundColor: any;
    offsetTop: boolean;
    paddingTop: string;
    paddingBottom: string;
}

export default function FeaturedGridBox({
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
    gridBackgroundColor,
    offsetTop,
    paddingTop,
    paddingBottom,
}: Props) {

    const styles = {
        paddingTop: paddingTop ?? '5rem',
        paddingBottom: paddingBottom ?? '5rem',
      }
    
      const allStyles = { ...backgroundStyles, ...styles }

    return (
        <div className={`${offsetTop && '-mt-32 relative'}`} style={allStyles}>
            <div className={`container`}>
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
                    <dl className={`grid rounded-sm grid-cols-1 lg:grid-cols-${columnNumber} ${content && 'mt-16'}`} style={{
                        backgroundColor: gridBackgroundColor
                    }}>
                        {blocks?.map((node: any) => {

                            const IconComponent = HeroIcons[node.icon as keyof typeof HeroIcons];
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
                                <div key={node._key} className={`${Styles.featureCardContainer} p-10`}>
                                    <dt className={`${Styles.featureCard}`} style={{
                                        color: node?.headingColor?.hex
                                    }}>
                                        {IconComponent && (
                                            <IconComponent className="h-5 w-5 flex-none" style={{
                                                color: node?.iconColor?.hex
                                            }} aria-hidden="true" />
                                        )}
                                        {node.value}
                                    </dt>
                                    <dd className={Styles.featureCardContent}>
                                        <p className="flex-auto" style={{
                                            color: node?.contentColor?.hex
                                        }}>{node.content}</p>
                                        {node?.button?.text &&
                                            <p className="mt-6">
                                                <Link href={linkUrl ?? '/'} className={`${Styles.featureCardCta}`} aria-label={`Link to ${node?.value}`} style={{
                                                    color: node?.linkColor?.hex
                                                }}>
                                                    {node?.button?.text} <span aria-hidden="true">→</span>
                                                </Link>
                                            </p>
                                        }
                                    </dd>
                                </div>
                            )
                        })}
                    </dl>
                </div>
            </div>
        </div>
    )
}
