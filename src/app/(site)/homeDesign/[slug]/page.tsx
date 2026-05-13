import React from 'react'
import { getHome } from '../../../../../lib/groq-data'
import HomeDesignLanding from '../../components/templates/home-design-landing'
import { notFound } from 'next/navigation'
import { Metadata } from 'next';

export const revalidate = 0;

type Props = {
    params: {
        slug: string
    }
}

// GENERATES SEO
export async function generateMetadata(): Promise<Metadata> {
    return {
        robots: {
            index: false,
            follow: false,
        }
    }
}

export default async function servicesSlug({ params }: Props) {

    const slug = params.slug
    const home = await getHome(slug)

    if (!home?.homeDesign) {
        notFound()
    }

    return (
        <HomeDesignLanding
            pageBuilder={home?.homeDesign?.pageBuilder}
            contactEmail={home?.profileSettings?.contact_information?.email}
        />
    )
}
