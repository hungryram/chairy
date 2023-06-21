import Image from "next/image";
import { ctaData } from "../../../../../sample/data";
import HeaderSection from "./header-section";
import Styles from "./cta-fullwidthimage.module.css"

interface Props {
    image: string;
    altText: string;
    blurData: string;
    content: string;
    reverseColumn: boolean;
    backgroundStyles: any;
    textAlign: string;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any
}

export default function CalltoActionFullWidth({
    image,
    altText,
    blurData,
    content,
    reverseColumn,
    backgroundStyles,
    textAlign,
    primaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryButtonStyle
}: Props) {
    return (
        <div className={`${Styles.fullWidthWrapper} ${reverseColumn ? 'flex-row-reverse' : ''}`} style={backgroundStyles}>
            <div className="relative h-96 overflow-hidden md:left-0 md:h-full lg:w-1/2">
                <Image
                    className="h-full w-full object-cover"
                    src={image}
                    alt={altText}
                    placeholder={blurData ? 'blur' : 'empty'}
                    blurDataURL={blurData}
                    width={1000}
                    height={800}

                />
            </div>
            <div className="relative mx-auto lg:w-1/2 justify-center flex items-center">
                <div className="lg:w-2/3 px-4 section">
                    {(content || primaryButtonLink || secondaryButtonLink) ? (
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
                    ) :
                        <div dangerouslySetInnerHTML={{ __html: ctaData.content }} />
                    }
                </div>
            </div>
        </div>
    )
}
