import Image from "next/image";
import Styles from "./logo-cloud.module.css"
import HeaderSection from "./header-section";

interface Props {
    images: any;
    backgroundStyles: any
    content: any;
    textAlign: string;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any;
    paddingTop: string;
    paddingBottom: string;
}

export default function LogoCloudSection({
    images,
    content,
    backgroundStyles,
    textAlign,
    primaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryButtonStyle,
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
                <div className={`${Styles.gridWrapper} ${content && 'mt-12'}`}>
                    {images && images?.map((node: any, i: number) => {
                        return (
                            <div key={i}>
                                <Image
                                    className={Styles.logoImage}
                                    src={node?.asset?.url}
                                    alt={node?.asset?.altText}
                                    width={200}
                                    height={48}
                                    placeholder={node?.asset?.lqip ? 'blur' : 'empty'}
                                    blurDataURL={node?.asset?.lqip}
                                />
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}
