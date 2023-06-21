import FormBuilder from "./form-builder";
import HeaderSection from "./header-section";

interface Props {
    content: string;
    backgroundStyles: any;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any;
    textAlign: string;
    formSchema: any;
    paddingTop: string;
    paddingBottom: string;
}

export default function LeadFormTwoColumn({
    content,
    backgroundStyles,
    primaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryButtonStyle,
    textAlign,
    formSchema,
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
                <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
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
                        <div className={`${content && 'mt-16'}`}>
                            <FormBuilder
                                formSchema={formSchema}
                            />
                        </div>
                </div>
            </div>
        </div>
    )
}
