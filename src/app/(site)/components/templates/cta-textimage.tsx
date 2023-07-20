'use client'
import Image from "next/image";
import ContentEditor from "../util/content-editor";
import { ctaData } from "../../../../../sample/data";
import Styles from "./cta-textimage.module.css"
import HeaderSection from "./header-section";
import React, { useRef, useState, useLayoutEffect } from "react";
import {
    useScroll,
    useTransform,
    useSpring,
    motion
} from "framer-motion";
import Animate from "./animate";

const calculateMinHeight = (height, range) => {
    return height + height * range;
};

const rand = (min = 0, max = 100) => {
    return Math.floor(Math.random() * (+max - +min)) + +min;
};

interface Props {
    image: string;
    altText: string;
    blurData: string;
    content: string;
    reverseColumn: boolean;
    backgroundStyles: any;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any;
    textAlign: string;
    paddingTop: string;
    paddingBottom: string;
}

export default function CalltoActionTextImage({
    image,
    altText,
    blurData,
    content,
    reverseColumn,
    backgroundStyles,
    primaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryButtonStyle,
    paddingTop,
    paddingBottom,
    textAlign
}: Props) {

    const styles = {
        paddingTop: paddingTop ?? '5rem',
        paddingBottom: paddingBottom ?? '5rem',
    }

    const allStyles = { ...backgroundStyles, ...styles }

    const range = 0.9;
    const { scrollY } = useScroll();
    const ref = useRef();
    const [offsetTop, setOffsetTop] = useState(0);
    const [minHeight, setMinHeight] = useState("auto");
    const springConfig = {
        damping: 100,
        stiffness: 100,
        mass: rand(1, 3)
    };

    useLayoutEffect(() => {
        if (!ref.current) return null;
        const onResize = () => {
            setOffsetTop(ref.current.offsetTop);
            setMinHeight(calculateMinHeight(ref.current.offsetHeight, range));
        };

        onResize();
        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, [ref]);


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
            <div className="container">
                <div className={`${Styles.ctaTextImageWrapper} space-y-10 ${reverseColumn ? 'flex-row-reverse' : ''}`}>
                    <div className="lg:w-1/2">
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
                    </div>
                    <div className="lg:w-1/2">
                        <motion.div ref={ref} initial={{ y: 0 }} style={{ y }}>
                            {image &&
                                <Image
                                    src={image}
                                    alt={altText}
                                    placeholder={blurData ? 'blur' : 'empty'}
                                    blurDataURL={blurData}
                                    width={1824}
                                    height={1080}
                                    className="relative z-50"
                                />
                            }
                        </motion.div>
                        <div className="relative bottom-48">
                            <div className="absolute inset-x-00 bottom-0 -z-10 transform-gpu left-0 right-0 flex justify-center" aria-hidden="true">
                                <div className="relative">
                                    <div
                                        className="w-96 h-48 rounded-full bg-gradient-to-tr from-[#fbfbfb] to-[#ffffff] opacity-20 backdrop-filter blur-3xl"
                                    />
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}
