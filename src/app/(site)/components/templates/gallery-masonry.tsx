'use client'
import React, { useState, useEffect, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import HeaderSection from "./header-section";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Autoplay, Pagination, Navigation } from 'swiper'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

SwiperCore.use([Autoplay, Pagination, Navigation])

interface Props {
    content: string;
    images: any
    textAlign: string;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any;
    backgroundStyles: any;
    disablePagination: boolean;
    paddingTop: string;
    paddingBottom: string;
}

const GalleryMasonry = ({
    content,
    textAlign,
    primaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryButtonStyle,
    backgroundStyles,
    images,
    disablePagination,
    paddingTop,
    paddingBottom,
}: Props) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const lightboxRef = useRef<HTMLDivElement>(null);

    const openLightbox = (image: string, index: number) => {
        setLightboxOpen(true);
        setSelectedImage(image);
        setCurrentIndex(index);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setSelectedImage("");
        setCurrentIndex(0);
    };


    useEffect(() => {
        if (lightboxOpen && lightboxRef.current) {
            lightboxRef.current.focus();
        }
    }, [lightboxOpen]);

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
                <div className={`md:columns-3 columns-2 gap-4 ${content && 'mt-16'}`}>
                    {images?.map((image: any, index: number) => (
                        <button
                            key={image._key}
                            onClick={() => openLightbox(image?.asset?.url, index)}
                            className="w-full h-full cursor-pointer"
                            aria-label={`View Image ${index + 1} ${image?.asset?.altText ? `of ${image?.asset?.altText}` : ''}`}
                        >
                            <Image
                                src={image?.asset?.url}
                                alt={image?.asset?.altText}
                                width={1000}
                                height={800}
                                className={`w-full mb-4 rounded-sm ${index % 2 === 0 ? 'aspect-video' : 'aspect-square'
                                    }`}
                                placeholder={image?.asset?.lqip ? 'blur' : 'empty'}
                                blurDataURL={image?.asset?.lqip}
                            />
                        </button>
                    ))}
                </div>
                {lightboxOpen && (
                    <Swiper
                        slidesPerView={1}
                        navigation={{
                            nextEl: ".image-swiper-button-next-lightbox",
                            enabled: true,
                            prevEl: ".image-swiper-button-prev-lightbox",
                            disabledClass: "swiper-button-disabled"
                        }}
                        className="!fixed !inset-0 !flex !items-center !justify-center z-50 bg-black bg-opacity-75"
                        initialSlide={currentIndex} // Set the initial slide index
                    >
                        {images?.map((image: any) => {
                            return (
                                <SwiperSlide key={image._key} className="mx-auto relative !flex !items-center !justify-center">
                                    <Image
                                        src={image?.asset?.url}
                                        alt={image?.asset?.altText}
                                        width={1000}
                                        height={800}
                                        sizes="100vw"
                                        placeholder={image?.asset?.lqip ? 'blur' : 'empty'}
                                        blurDataURL={image?.asset?.lqip}
                                    />
                                </SwiperSlide>
                            )
                        })}
                        <button
                            className="absolute top-36 right-0 m-4 text-white cursor-pointer z-50"
                            onClick={closeLightbox}
                            aria-label="Close Lightbox"
                        >
                            <XMarkIcon className="h-8 w-8" />
                        </button>
                        <div className="swiper-button image-swiper-button-next-lightbox absolute right-0 top-1/2 flex items-center justify-center z-50">
                            <IoIosArrowForward className="text-3xl" style={{
                                color: '#ffffff'
                            }} />
                        </div>
                        <div className="swiper-button image-swiper-button-prev-lightbox absolute left-0 top-1/2 flex items-center justify-center z-50">
                            <IoIosArrowBack className="text-3xl" style={{
                                color: '#ffffff'
                            }} />
                        </div>
                    </Swiper>
                )}

            </div>
        </div>
    );
};

export default GalleryMasonry;
