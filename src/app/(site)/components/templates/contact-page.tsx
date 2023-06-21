'use client'
import { MapPinIcon, EnvelopeIcon, PhoneIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'
import { contactData } from '../../../../../sample/data';
import ContentEditor from '../util/content-editor';
import FormBuilder from './form-builder';
import Social from './social';

interface Props {
    content: string;
    email: string;
    phone_number: string;
    office_number: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    emailAlerts: string;
    sendFrom: string;
    emailBcc: string;
    emailCc: string;
    formBuilder: any;
    backgroundStyles: any
    // SOCIAL
    facebook: any;
    youtube: any;
    instagram: any;
    twitter: any;
    reddit: any;
    linkedin: any;
    yelp: any;
    pinterest: any;
    tiktok: any;
    zillow: any;
    hideContact: any
}

export default function ContactPage({
    content,
    // CONTACT
    email,
    phone_number,
    office_number,
    address,
    city,
    state,
    zip_code,
    formBuilder,
    backgroundStyles,
    // SOCIAL
    facebook,
    youtube,
    instagram,
    twitter,
    reddit,
    linkedin,
    yelp,
    pinterest,
    tiktok,
    zillow,
    hideContact
}: Props) {
    return (
        <div className="relative">
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48" style={backgroundStyles}>
                    <div className="mx-auto max-w-xl lg:max-w-lg">
                        <div className="content">
                            {content ?
                                <ContentEditor
                                    content={content}
                                />
                                :
                                <div dangerouslySetInnerHTML={{ __html: contactData.content }} />
                            }
                        </div>
                        {!hideContact &&
                            <>
                                <dl className="mt-10 space-y-4 text-base leading-7">
                                    {address || city || state || zip_code ? (
                                        <div className="flex gap-x-4 ">
                                            <dt className="flex-none">
                                                <span className="sr-only">Address</span>
                                                <MapPinIcon className="h-7 w-6  opacity-60" aria-hidden="true" />
                                            </dt>
                                            <dd className='text-inherit'>
                                                {address && (
                                                    <>
                                                        {address}
                                                        <br />
                                                    </>
                                                )}
                                                {city && (
                                                    <>
                                                        {city ? city + ',' : ''}
                                                    </>
                                                )}{' '}
                                                {state} {zip_code}
                                            </dd>
                                        </div>
                                    ) : null}

                                    {phone_number &&
                                        <div className="flex gap-x-4">
                                            <dt className="flex-none">
                                                <span className="sr-only">Direct</span>
                                                <DevicePhoneMobileIcon className="h-7 w-6  opacity-60" aria-hidden="true" />
                                            </dt>
                                            <dd>
                                                <a href={`tel:${phone_number}`}>{phone_number}</a>
                                            </dd>
                                        </div>
                                    }
                                    {office_number &&
                                        <div className="flex gap-x-4">
                                            <dt className="flex-none">
                                                <span className="sr-only">Office</span>
                                                <PhoneIcon className="h-7 w-6  opacity-60" aria-hidden="true" />
                                            </dt>
                                            <dd>
                                                <a href={`tel:${office_number}`}>{office_number}</a>
                                            </dd>
                                        </div>
                                    }
                                    {email &&
                                        <div className="flex gap-x-4">
                                            <dt className="flex-none">
                                                <span className="sr-only">Email</span>
                                                <EnvelopeIcon className="h-7 w-6  opacity-60" aria-hidden="true" />
                                            </dt>
                                            <dd>
                                                <a href={`mailto:${email}`}>{email}</a>
                                            </dd>
                                        </div>
                                    }
                                </dl>
                                <Social
                                    facebook={facebook}
                                    youtube={youtube}
                                    instagram={instagram}
                                    twitter={twitter}
                                    reddit={reddit}
                                    linkedin={linkedin}
                                    yelp={yelp}
                                    pinterest={pinterest}
                                    tiktok={tiktok}
                                    zillow={zillow}
                                />
                            </>
                        }
                    </div>
                </div>
                <div>
                    <div className="mx-auto max-w-2xl">
                        <div className="py-10">
                            <FormBuilder
                                formSchema={formBuilder}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
