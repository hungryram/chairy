import { StarIcon } from '@heroicons/react/20/solid'
import HeaderSection from './header-section';
import ContentEditor from '../util/content-editor';
import Image from 'next/image';
import { urlForImage } from '../../../../../sanity/lib/image';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

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
    secondaryButtonStyle: any;
    paddingTop: string;
    paddingBottom: string;
}

export default function TestimonialsColumn({
    testimonials,
    content,
    textAlign,
    primaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryButtonStyle,
    backgroundStyles,
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
                <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
                    {testimonials.map((testimonial: any) => (
                        <div key={testimonial.id} className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
                            <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                                <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                                    <h3 className="text-sm font-medium text-gray-900">{testimonial.title}</h3>
                                    {testimonial.testimonial &&
                                        <div className="content">
                                            <ContentEditor
                                                content={testimonial.testimonial}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="mt-6 flex items-center lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                                <figcaption className="mt-6 flex items-center gap-x-4">
                                    {testimonial?.image &&
                                        <div className="relative w-12 h-12">
                                            <Image
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={urlForImage(testimonial?.image).url()}
                                                alt={testimonial?.name}
                                                fill={true}
                                            />
                                        </div>
                                    }
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        {testimonial?.position && <div className="text-gray-600">{testimonial?.position}</div>}
                                    </div>
                                </figcaption>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
