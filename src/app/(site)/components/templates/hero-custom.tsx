import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import HeaderSection from './header-section';
import FormBuilder from './form-builder';
import Animate from './animate';
import Link from 'next/link';

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
    imageOverlayColor: any
    imageHeight: any;
    formBuilder: any
}

export default function HeroCustom({
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
    formBuilder
}: Props) {

    return (
        <div className="bg-[#070808]" id="download">
            <div className="relative isolate pt-14">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#303030] to-[#686868] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 80% 76.8%, 80% 97.7%, 74.1% 60.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto container py-32 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
                    <div className="mx-auto lg:mx-0 lg:flex-auto">
                        {(content || primaryButtonLink || secondaryButtonLink) && (
                            <>
                                <div className="mb-10">
                                    <div style={{
                                        color: textColor
                                    }}>

                                        <HeaderSection
                                            content={content}
                                            textAlign={textAlign}
                                            // PRIMARY
                                            // buttonLink={primaryButtonLink}
                                            // primaryButtonText={primaryButtonText}
                                            // primaryButtonStyle={primaryButtonStyle}
                                            // SECONDARY
                                            secondaryButtonLink={secondaryButtonLink}
                                            secondaryButtonText={secondaryButtonText}
                                            secondaryButtonStyle={secondaryButtonStyle}
                                        />
                                    </div>
                                </div>
                                {/* <div>
                                    <Link href="/sign-up" className="!bg-[#7D0202] !text-white uppercase flex md:w-3/4 text-center h-20 items-center justify-center">Sign up for early access</Link>
                                </div> */}
                                {/* <FormBuilder
                                    formSchema={formBuilder}
                                /> */}
                            </>
                        )
                        }
                    </div>
                    <div className="lg:w-1/2 mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
                        <Animate>
                            {image &&
                                <Image
                                    src={image}
                                    alt={altText}
                                    placeholder={blurData ? 'blur' : 'empty'}
                                    blurDataURL={blurData}
                                    width={900}
                                    height={900}
                                />
                            }
                        </Animate>

                    </div>
                    <div
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#303030] to-[#686868] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                </div>
                {/* <div className="relative" aria-hidden="true">
                <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-900 pt-[20%]" />
              </div> */}
            </div>
        </div>
    )
}
