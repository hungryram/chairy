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
        <div className="container">
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="relative" style={backgroundStyles}>
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
                    <div>
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
                <div className="relative">
                    <div className="mx-auto max-w-2xl">
                        <div>
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
