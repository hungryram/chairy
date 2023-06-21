'use client'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { urlForImage } from "../../../../../sanity/lib/image";
import ContentEditor from "../util/content-editor";
import HeaderSection from "./header-section";
import { Navigation } from "swiper";

interface Props {
  testimonials: any[];
  content: any;
  textAlign: string;
  primaryButtonLink: string;
  primaryButtonText: string;
  primaryButtonStyle: any;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  backgroundStyles: any;
  secondaryButtonStyle: any
  slideNumber: number;
  navigationColors: string;
  paddingTop: string;
  paddingBottom: string;
}

export default function TestimonialSwiper({
  testimonials,
  content,
  slideNumber,
  backgroundStyles,
  primaryButtonLink,
  primaryButtonText,
  primaryButtonStyle,
  textAlign,
  secondaryButtonLink,
  secondaryButtonText,
  secondaryButtonStyle,
  navigationColors,
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
        <Swiper
          slidesPerView={slideNumber ? slideNumber : 1}
          spaceBetween={20}
          effect={"slide"}
          modules={[Navigation]}
          navigation={{
            nextEl: ".image-swiper-button-next",
            prevEl: ".image-swiper-button-prev",
            disabledClass: "swiper-button-disabled"
          }}
          role="region"
          aria-label="Image Gallery"
          className={content && 'mt-16'}
          a11y={{
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
          }}
          breakpoints={{
            // When window width is >= 1024px (desktop)
            1024: {
              slidesPerView: slideNumber ? slideNumber : 1,
              spaceBetween: 30,
            },
            // When window width is >= 768px (iPad)
            768: {
              slidesPerView: slideNumber < 2 ? 1 : 2,
              spaceBetween: 20,
            },
            // When window width is < 768px (iPhone)
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
          }}
        >
            <div className="swiper-button image-swiper-button-next absolute right-0 top-1/2 flex items-center justify-center z-50">
              <IoIosArrowForward className="text-3xl" style={{
                color: navigationColors
              }}/>
            </div>
            <div className="swiper-button image-swiper-button-prev absolute left-0 top-1/2 flex items-center justify-center z-50">
              <IoIosArrowBack className="text-3xl" style={{
                color: navigationColors
              }}/>
            </div>
          {testimonials?.map((testimonial: any) => (
            <SwiperSlide key={testimonial._id}>
              <div className="mx-auto">
                <figure>
                  <blockquote className="text-center">
                    {testimonial.testimonial &&
                      <div className="content opacity-90">
                        <ContentEditor
                          content={testimonial.testimonial}
                        />
                      </div>
                    }
                  </blockquote>
                  <figcaption className="mt-10">
                    {testimonial?.image &&
                      <Image
                        className="h-10 w-10 rounded-full mx-auto"
                        src={urlForImage(testimonial?.image).url()}
                        alt={testimonial?.name}
                        width={100}
                        height={100}
                      />
                    }
                    <div className="mt-4 flex items-center justify-center space-x-3">
                      <div className="font-normal"><h3>{testimonial.name}</h3></div>
                      {testimonial?.position &&
                        <>
                          <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="text-inherit">
                            <circle cx={1} cy={1} r={1} />
                          </svg>
                          <div className="opacity-80">{testimonial?.position}</div>
                        </>
                      }
                    </div>
                  </figcaption>
                </figure>
              </div>
            </SwiperSlide>
          ))
          }
        </Swiper>
      </div>
    </div>
  )
}
