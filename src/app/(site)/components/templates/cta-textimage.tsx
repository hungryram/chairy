import Image from "next/image";
import ContentEditor from "../util/content-editor";
import { ctaData } from "../../../../../sample/data";
import Styles from "./cta-textimage.module.css"
import HeaderSection from "./header-section";

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

    return (
        <div style={allStyles}>
            <div className="container">
                <div className={`${Styles.ctaTextImageWrapper} space-y-10 ${reverseColumn ? 'flex-row-reverse' : ''}`}>
                    <div className="lg:w-1/2">
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
                    </div>
                    <div className="lg:w-1/2">
                        {image ?
                            <Image
                                src={image}
                                alt={altText}
                                placeholder={blurData ? 'blur' : 'empty'}
                                blurDataURL={blurData}
                                width={1824}
                                height={1080}
                            />
                            :
                            <img src={ctaData.image} alt="placeholder" />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
