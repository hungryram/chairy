import React from 'react'
import { getTeam } from '../../../../../lib/groq-data'
import Styles from '../../components/templates/cta-textimage.module.css'
import ContentEditor from '../../components/util/content-editor'
import Image from 'next/image'
import { DevicePhoneMobileIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { notFound } from 'next/navigation'
import { Metadata } from 'next';
import Social from '../../components/templates/social'

type Props = {
    params: {
        slug: string
    }
}

type Meta = {
    params: {
        slug: string
    }
}

// GENERATES SEO
export async function generateMetadata({ params }: Meta): Promise<Metadata> {
    const slug = params.slug
    const teamMetaData = await getTeam(slug)

    return {
        title: teamMetaData?.team?.seo?.title_tag,
        description: teamMetaData?.team?.seo?.meta_description,
        alternates: {
            canonical: 'team/' + teamMetaData?.team?.slug
        },
        openGraph: {
            title: teamMetaData?.team?.seo?.title_tag,
            description: teamMetaData?.team?.seo?.meta_description,
            url: 'team/' + teamMetaData?.team?.slug,
            siteName: teamMetaData?.profileSettings?.company_name,
            locale: 'en-US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: teamMetaData?.team?.seo?.title_tag,
            description: teamMetaData?.team?.seo?.meta_description,
            creator: '@' + teamMetaData?.profileSettings?.seo?.twitterHandle,
        },
        icons: {
            icon: teamMetaData.appearances.branding.favicon.asset.url,
            shortcut: teamMetaData.appearances.branding.favicon.asset.url,
            apple: teamMetaData.appearances.branding.favicon.asset.url,
        },
        robots: {
            index: teamMetaData?.team?.seo?.noIndex ? false : true,
            follow: teamMetaData?.team?.seo?.noIndex ? false : true,
        }
    }
}

export default async function TeamSlug({ params }: Props) {
    const slug = params.slug
    const team = await getTeam(slug)

    if (!team?.team) {
        notFound()
    }

    const data = team?.team

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "Person",
        ...(data?.name && { "name": data?.name }),
        ...(data?.jobTitle && { "jobTitle": data?.jobTitle }),
        "url": `${team?.profileSettings?.settings?.websiteName}/team/${data?.slug}`,
        ...(data?.imageData?.asset?.url && { "image": data?.imageData?.asset?.url }),
        "worksFor": {
            "@type": "Organization",
            ...(team?.profileSettings?.company_name && { "name": team?.profileSettings?.company_name }),
            ...(team?.profileSettings?.settings?.websiteName && { "url": team?.profileSettings?.settings?.websiteName })
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />
            <div className="section">
                <div className="container">
                    <div className="pb-20">
                        <div className="mx-auto max-w-7xl">
                            <div className="mx-auto max-w-2xl lg:mx-0">
                                <p className="text-base font-semibold leading-7">{data?.position}</p>
                                <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{data?.name}</h1>
                                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 md:flex lg:gap-x-10 mt-10">
                                    {data?.contactInformation?.phoneNumber && <a href={`tel:${data?.contactInformation?.phoneNumber}`} className="flex items-center"><DevicePhoneMobileIcon className="w-4 h-4 inline-block mr-2 font-semibold" />{data?.contactInformation?.phoneNumber}</a>}
                                    {data?.contactInformation?.email && <a href={`mailto:${data?.contactInformation?.email}`} className="flex items-center font-normal"><EnvelopeIcon className="w-4 h-4 inline-block mr-2 font-semibold" />{data?.contactInformation?.email}</a>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`lg:flex lg:gap-x-20`}>
                        <div className="lg:w-2/5">
                            {data?.imageData?.asset?.url &&
                                <Image
                                    src={data?.imageData?.asset?.url}
                                    alt={data?.imageData?.asset?.altText}
                                    placeholder={data?.imageData?.asset?.lqip ? 'blur' : 'empty'}
                                    blurDataURL={data?.imageData?.asset?.lqip}
                                    width={1824}
                                    height={1080}
                                />
                            }
                        </div>
                        <div className={`${Styles.ctaContent} lg:w-3/5`}>
                            <div className="content pt-10">
                                {data?.about ?
                                    <ContentEditor
                                        content={data?.about}
                                    />
                                    :
                                    <p>Bio coming soon!</p>
                                }
                                <div className="accent">
                                    <Social
                                        facebook={data?.socialAccounts?.facebook}
                                        youtube={data?.socialAccounts?.youtube}
                                        instagram={data?.socialAccounts?.instagram}
                                        twitter={data?.socialAccounts?.twitter}
                                        reddit={data?.socialAccounts?.reddit}
                                        linkedin={data?.socialAccounts?.linkedin}
                                        yelp={data?.socialAccounts?.yelp}
                                        pinterest={data?.socialAccounts?.pinterest}
                                        tiktok={data?.socialAccounts?.tiktok}
                                        zillow={data?.socialAccounts?.zillow}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
