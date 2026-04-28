'use client'

import Styles from "./feature-section.module.css"
import * as HeroIcons from '@heroicons/react/24/outline';
import HeaderSection from "./header-section";
import Link from "next/link";
import ContentEditor from "../util/content-editor";
import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Animate from "./animate";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const calculateMinHeight = (height: any, range: any) => {
    return height + height * range;
};

const rand = (min = 0, max = 100) => {
    return Math.floor(Math.random() * (+max - +min)) + +min;
};

interface Props {
    backgroundStyles: any;
    columnNumber: number;
    blocks: any;
    content: any;
    secondContent: any;
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
    secondContent,
    textAlign,
    primaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryButtonStyle,
    gridBackgroundColor,
    paddingTop,
    paddingBottom,
}: Props) {

    const styles = {
        paddingTop: paddingTop ?? '5rem',
        paddingBottom: paddingBottom ?? '5rem',
    }

    const allStyles = { ...backgroundStyles, ...styles }

    const range = 0.9;
    const { scrollY } = useScroll();
    const imageRef = useRef<HTMLDivElement | null>(null);
    const [offsetTop, setOffsetTop] = useState(0);
    const springConfig = {
        damping: 100,
        stiffness: 100,
        mass: rand(1, 3)
    };

    useLayoutEffect(() => {
        if (!imageRef.current) return;

        const onResize = () => {
            if (!imageRef.current) return;
            setOffsetTop(imageRef.current.offsetTop);
        };

        onResize();
        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, []);

    const y = useSpring(
        useTransform(
            scrollY,
            [offsetTop - 400, offsetTop + 400],
            ["0%", `${range * 100}%`]
        ),
        springConfig
    );


    return (
        <div style={allStyles}>
            <div className={`container`}>
                <Animate>
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
                </Animate>
                <div className={Styles.featureGridWrap}>
                    <div className="lg:flex justify-center items-center">
                        <div className="lg:w-1/2">
                            <Animate>
                                <dl className={`grid rounded-sm grid-cols-1 lg:grid-cols-${columnNumber} ${content && 'mt-16'} `} style={{
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
                                            <div key={node._key} className={`${Styles.featureCardContainer} p-6`}>
                                                <dt className={`${Styles.featureCard}`} style={{
                                                    color: node?.headingColor?.hex
                                                }}>
                                                    {IconComponent && (
                                                        <IconComponent className="h-5 w-5 flex-none gradient-accent" style={{
                                                            color: node?.iconColor?.hex
                                                        }} aria-hidden="true" />
                                                    )}
                                                    {node.value}
                                                </dt>
                                                <dd className={Styles.featureCardContent}>
                                                    {node?.content &&
                                                        <p className="flex-auto" style={{
                                                            color: node?.contentColor?.hex
                                                        }}>{node.content}</p>
                                                    }
                                                    {node?.newContent &&
                                                        <div className="content">
                                                            <ContentEditor
                                                                content={node?.newContent}
                                                            />
                                                        </div>
                                                    }
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
                                    {/* <div className="my-10 text-center !font-light text-sm">
                                        {(secondContent) && (
                                            <HeaderSection
                                                content={secondContent}
                                                textAlign={textAlign}
                                            />
                                        )}

                                    </div> */}
                                </dl>
                            </Animate>
                        </div>
                        <div className="lg:w-1/2">
                            <motion.div ref={imageRef} initial={{ y: 0 }} style={{ y }}>
                                <Image
                                    src={'https://cdn.sanity.io/images/ez8qjsla/production/ca284cf0ef93d709b2992a988e41475900566be7-4992x4920.webp'}
                                    alt={'2 mobile phones mockup'}
                                    width={1824}
                                    height={1080}
                                    className="relative z-50"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
