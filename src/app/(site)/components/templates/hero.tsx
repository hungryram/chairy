import Image from "next/image";
import Styles from "./hero.module.css"
import HeaderSection from "./header-section";

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
    imageHeight: any
}

export default function Hero({
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
    imageOverlayColor,
    imageHeight
}: Props) {

    const imageOverlay = {
        background:
            `rgba(${imageOverlayColor?.rgb?.r ?? '0'}, ${imageOverlayColor?.rgb?.g ?? '0'}, ${imageOverlayColor?.rgb?.b ?? '0'}, ${imageOverlayColor?.rgb?.a ?? '0.2'})`,
    };

    return (
        <div className={`relative isolate inset-0 ${imageHeight} flex items-center`}>
            {image &&
                <Image
                    src={image}
                    alt={altText}
                    placeholder={blurData ? 'blur' : 'empty'}
                    blurDataURL={blurData}
                    className={Styles.heroImage}
                    fill={true}
                    sizes="100vw"
                    priority={true}
                />
            }
            <div className="absolute inset-0" style={imageOverlay}></div>
            {(content || primaryButtonLink || secondaryButtonLink) && (
                <div className={`container ${Styles.heroInnerContainer}`}>
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
    )
}