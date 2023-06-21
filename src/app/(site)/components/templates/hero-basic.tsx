import HeaderSection from "./header-section";
import Image from "next/image";

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

export default function HeroBasic({
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
        <div className="relative bg-white">
            <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
                    {(content || primaryButtonLink || secondaryButtonLink) && (
                        <div className={`mx-auto max-w-2xl lg:mx-0`}>
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
                <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
                    {image &&
                        <Image
                            src={image}
                            alt={altText}
                            placeholder={blurData ? 'blur' : 'empty'}
                            blurDataURL={blurData}
                            className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                            priority={true}
                            width={2000}
                            height={1080}
                        />
                    }
                </div>
            </div>
        </div>
    )
}
