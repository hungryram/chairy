'use client'
import Image from "next/image";
import { heroData } from "../../../../../sample/data";
import Styles from "./hero.module.css"
import Link from "next/link";
import ContentEditor from "../util/content-editor";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, A11y, EffectFade } from "swiper";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Import Swiper styles

// Initialize Swiper modules
SwiperCore.use([Navigation, A11y, EffectFade]);

interface Props {
    images: any;
    textAlign: string;
    textColor: string;
    imageOverlayColor: any
    imageHeight: any;
    navigationColors: string
    animation: string;
}

export default function HeroSwiper({
    images,
    textAlign,
    textColor,
    imageOverlayColor,
    imageHeight,
    navigationColors,
}: Props) {

    const imageOverlay = {
        background: `rgba(${imageOverlayColor?.rgb?.r ?? '0'}, ${imageOverlayColor?.rgb?.g ?? '0'}, ${imageOverlayColor?.rgb?.b ?? '0'}, ${imageOverlayColor?.rgb?.a ?? '0.2'})`,
    };

    return (
        <Swiper
            modules={[EffectFade, Navigation]}
            effect={'slide'}
            navigation={{
                nextEl: ".image-swiper-button-next",
                prevEl: ".image-swiper-button-prev",
                disabledClass: "swiper-button-disabled"
            }}
            spaceBetween={0}
            loop={true}
            slidesPerView={1}
            speed={1500}
            autoplay={{
                delay: 3000
            }}
        >
            <div className="swiper-button image-swiper-button-next absolute right-0 top-1/2 flex items-center justify-center z-50">
                <IoIosArrowForward className="text-3xl" style={{
                    color: navigationColors
                }} />
            </div>
            <div className="swiper-button image-swiper-button-prev absolute left-0 top-1/2 flex items-center justify-center z-50">
                <IoIosArrowBack className="text-3xl" style={{
                    color: navigationColors
                }} />
            </div>
            {images?.map((slides: any) => {

                // PRIMARY BUTTON STYLES
                const primaryButton = {
                    backgroundColor: `rgba(
                        ${slides?.buttonLinking?.buttonBackground?.rgb.r}, 
                        ${slides?.buttonLinking?.buttonBackground?.rgb.g}, 
                        ${slides?.buttonLinking?.buttonBackground?.rgb.b}, 
                        ${slides?.buttonLinking?.buttonBackground?.rgb.a})`,
                    color: `${slides?.buttonLinking?.buttonTextColor?.hex}`,
                    // border: `1px solid ${slides?.buttonLinking?.buttonBorderColor?.hex}`
                }

                // SECONDARY BUTTON STYLES
                const secondaryButtonStyles = {
                    backgroundColor: `rgba(
                        ${slides?.secondButtonLinking?.buttonBackground?.rgb.r}, 
                        ${slides?.secondButtonLinking?.buttonBackground?.rgb.g}, 
                        ${slides?.secondButtonLinking?.buttonBackground?.rgb.b}, 
                        ${slides?.secondButtonLinking?.buttonBackground?.rgb.a})`,
                    color: `${slides?.secondButtonLinking?.buttonTextColor?.hex}`,
                    // border: `1px solid ${slides?.buttonLinking?.buttonBorderColor?.hex}`
                }

                const buttonLinking =
                    (slides.buttonLinking?.internalLink?._type === "pages" && `/${slides.buttonLinking?.internalLink.slug}`) ||
                    (slides.buttonLinking?.internalLink?._type === "blog" && `/blog/${slides.buttonLinking?.internalLink.slug}`) ||
                    (slides.buttonLinking?.internalLink?._type === "legal" && `/legal/${slides.buttonLinking?.internalLink.slug}`) ||
                    (slides.buttonLinking?.internalLink?._type === "services" && `/services/${slides.buttonLinking?.internalLink.slug}`) ||
                    (slides.buttonLinking?.internalLink?._type === "team" && `/team/${slides.buttonLinking?.internalLink.slug}`) ||
                    (slides.buttonLinking?.externalUrl && `${slides.buttonLinking?.externalUrl}`)

                const secondaryButtonLinking =
                    (slides?.secondButtonLinking?.internalLink?._type === "pages" && `/${slides?.secondButtonLinking?.internalLink.slug}`) ||
                    (slides?.secondButtonLinking?.internalLink?._type === "blog" && `/blog/${slides?.secondButtonLinking?.internalLink.slug}`) ||
                    (slides?.secondButtonLinking?.internalLink?._type === "legal" && `/legal/${slides?.secondButtonLinking?.internalLink.slug}`) ||
                    (slides?.secondButtonLinking?.internalLink?._type === "services" && `/services/${slides?.secondButtonLinking?.internalLink.slug}`) ||
                    (slides?.secondButtonLinking?.internalLink?._type === "team" && `/team/${slides?.secondButtonLinking?.internalLink.slug}`) ||
                    (slides?.secondButtonLinking?.externalUrl && `${slides?.secondButtonLinking?.externalUrl}`)
                return (
                    <SwiperSlide key={slides?._key}>
                        <div className={`relative inset-0 flex items-center ${imageHeight ?? 'h-[70vh]'}`}>
                            <Image
                                src={slides?.asset?.url ? slides?.asset?.url : heroData.image}
                                alt={slides?.asset?.altText}
                                placeholder={slides?.asset?.lqip ? 'blur' : 'empty'}
                                blurDataURL={slides?.asset?.lqip}
                                className={Styles.heroImage}
                                width={2000}
                                height={0}
                                sizes="100vw"
                                priority={true}
                            />
                            <div className="absolute inset-0" style={imageOverlay}></div>
                            <div className={`container relative py-10`}>
                                <div style={{ color: textColor }}>
                                    {buttonLinking && (
                                        <div className={`content max-w-2xl ${textAlign}`}>
                                            <ContentEditor content={slides?.content} />
                                            <div className={`mt-10 flex items-center gap-x-6 ${textAlign}`}>
                                                {buttonLinking && (
                                                    <Link href={buttonLinking ?? '/'} className="primary-button" target={slides.buttonLinking?.externalUrl && '_blank'} style={primaryButton}>
                                                        {slides?.buttonLinking?.buttonText}
                                                    </Link>
                                                )}
                                                {secondaryButtonLinking && (
                                                    <Link href={secondaryButtonLinking ?? '/'} className="secondary-button" target={secondaryButtonLinking.externalUrl && '_blank'} style={secondaryButtonStyles}>
                                                        {slides?.secondButtonLinking?.buttonText} <span aria-hidden="true">→</span>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    );
}
