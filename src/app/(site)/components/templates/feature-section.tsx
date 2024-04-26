import Styles from "./feature-section.module.css"
import * as HeroIcons from '@heroicons/react/24/outline';
import HeaderSection from "./header-section";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "../../../../../sanity/lib/image";

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

export default function FeatureSection({
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
                <div>
                    <div className="grid grid-cols-2 text-center content">
                        <div><h2>Before</h2></div>
                        <div><h2 className="gradient-accent">After</h2></div>
                    </div>
                    <dl className={`grid grid-cols-2 lg:grid-cols-${columnNumber} ${content && 'mt-16'} divide-y divide-solid divide-white/40 divide-x border border-white/40`}>
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
                                <div key={node._key} className={`${Styles.featureCardContainer} md:px-10 md:py-4 px-4 py-6`}>
                                    <dt className={Styles.featureCard} style={{
                                        color: node?.headingColor?.hex
                                    }}>
                                        {IconComponent && (
                                            <IconComponent className="h-5 w-5 flex-none" style={{
                                                color: node?.iconColor?.hex
                                            }} aria-hidden="true" />
                                        )}
                                        {node?.iconImage &&
                                            <div className="relative w-20 h-20">
                                                <Image
                                                    src={urlForImage(node?.iconImage).url()}
                                                    alt="icon"
                                                    fill={true}
                                                    className="object-contain"
                                                />
                                            </div>
                                        }
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
