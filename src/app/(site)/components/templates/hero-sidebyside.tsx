import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import HeaderSection from './header-section'

interface Props {
  content: string[];
  image: any;
  altText: string;
  blurData: "blur" | "empty" | undefined;
  primaryButtonLink: string;
  primaryButtonText: string;
  primaryButtonStyle: any;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  secondaryButtonStyle: any;
  textAlign: string;
  textColor: string;
}

export default function HeroSidebySide({
  content,
  image,
  altText,
  blurData,
  primaryButtonLink,
  primaryButtonText,
  primaryButtonStyle,
  secondaryButtonLink,
  secondaryButtonText,
  secondaryButtonStyle,
  textAlign,
  textColor,
}: Props) {

  return (
    <div className="bg-white">

      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <svg
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                {(content || primaryButtonLink || secondaryButtonLink) && (
                  <div className={`container`}>
                    <div style={{
                      color: textColor
                    }}>

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
                    </div>
                  </div>
                )
                }
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
            src={image}
            alt={altText}
            placeholder={blurData ? 'blur' : 'empty'}
            blurDataURL={blurData}
            fill={true}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </div>
  )
}
