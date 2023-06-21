import ContentEditor from "../util/content-editor";
import { ctaData } from "../../../../../sample/data";
import Link from "next/link";

interface Props {
    content: string;
    backgroundStyles: any;
    buttonLink: any;
    secondaryButtonLink: any;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonStyle: any;
    secondaryButtonText: string;
    paddingTop?: string,
    paddingBottom?: string
}

export default function CalltoActionLeftText({
    content,
    backgroundStyles,
    buttonLink,
    secondaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonStyle,
    secondaryButtonText,
    paddingTop,
    paddingBottom,
}: Props) {

    const primaryButtonLinking =
        (buttonLink?.internalLink?._type === "pages" && `/${buttonLink?.internalLink.slug}`) ||
        (buttonLink?.internalLink?._type === "blog" && `/blog/${buttonLink?.internalLink.slug}`) ||
        (buttonLink?.internalLink?._type === "legal" && `/legal/${buttonLink?.internalLink.slug}`) ||
        (buttonLink?.internalLink?._type === "services" && `/services/${buttonLink?.internalLink.slug}`) ||
        (buttonLink?.internalLink?._type === "team" && `/team/${buttonLink?.internalLink.slug}`) ||
        (buttonLink?.externalUrl && `${buttonLink?.externalUrl}`)

    const secondaryButtonLinking =
        (secondaryButtonLink?.internalLink?._type === "pages" && `/${secondaryButtonLink?.internalLink.slug}`) ||
        (secondaryButtonLink?.internalLink?._type === "blog" && `/blog/${secondaryButtonLink?.internalLink.slug}`) ||
        (secondaryButtonLink?.internalLink?._type === "legal" && `/legal/${secondaryButtonLink?.internalLink.slug}`) ||
        (secondaryButtonLink?.internalLink?._type === "services" && `/services/${secondaryButtonLink?.internalLink.slug}`) ||
        (secondaryButtonLink?.internalLink?._type === "team" && `/team/${secondaryButtonLink?.internalLink.slug}`) ||
        (secondaryButtonLink?.externalUrl && `${buttonLink?.externalUrl}`)

        const styles = {
            paddingTop: paddingTop ?? '5rem',
            paddingBottom: paddingBottom ?? '5rem',
          }
        
          const allStyles = { ...backgroundStyles, ...styles }

    return (
        <div style={allStyles}>
            <div className="container lg:flex lg:items-center lg:justify-between">
                <div className="content lg:w-1/2">
                    {content ?
                        <ContentEditor
                            content={content}
                        />
                        :
                        <div dangerouslySetInnerHTML={{ __html: ctaData.content }} />
                    }
                </div>
                <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
                    <div className={`flex items-center gap-x-6`}>
                        {primaryButtonLinking && (
                            <Link href={primaryButtonLinking} className="primary-button" style={primaryButtonStyle} target={buttonLink?.externalUrl && '_blank'}>
                                {primaryButtonText}
                            </Link>
                        )}
                        {secondaryButtonLinking && (
                            <Link href={secondaryButtonLinking} className="secondary-button" style={secondaryButtonStyle} target={secondaryButtonLink.externalUrl && '_blank'}>
                                {secondaryButtonText} <span aria-hidden="true">→</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
