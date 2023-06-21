import { client } from "../../../../sanity/lib/client"
import { teamPage } from "../../../../lib/groq-data"
import TeamCard from "../components/templates/team-card"
import { notFound } from "next/navigation"
import ContentEditor from "../components/util/content-editor"

// GENERATES SEO
export async function generateMetadata() {
    const teamMeta = await client.fetch(teamPage)

    const hasTeam = teamMeta?.team?.length > 0;


    return {
        title: teamMeta?.pageSetting?.team?.seo?.title_tag,
        description: teamMeta?.pageSetting?.team?.seo?.meta_description,
        alternates: {
            canonical: 'team/'
        },
        openGraph: {
            title: teamMeta?.pageSetting?.team?.seo?.title_tag,
            description: teamMeta?.pageSetting?.team?.seo?.meta_description,
            url: 'team/',
            siteName: teamMeta?.profileSettings?.company_name,
            images: teamMeta?.profileSettings?.seo?.defaultImageBanner?.asset?.url,
            locale: 'en-US',
            type: 'website',
        },
        twitter: {
            title: teamMeta?.pageSetting?.team?.seo?.title_tag,
            description: teamMeta?.pageSetting?.team?.seo?.meta_description,
            creator: '@' + teamMeta?.profileSettings?.seo?.twitterHandle,
        },
        icons: {
            icon: teamMeta.appearances?.branding?.favicon?.asset?.url,
            shortcut: teamMeta.appearances?.branding?.favicon?.asset?.url,
            apple: teamMeta.appearances?.branding?.favicon?.asset?.url,
        },
        robots: {
            index: hasTeam,
            follow: hasTeam
        }
    }
}

export default async function TeamSection() {

    const team = await client.fetch(teamPage, { next: { revalidate: 60 } })

    if (!team.team) {
        notFound()
    }

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Team",
        "url": `${team?.profileSettings?.settings?.websiteName}/team`,
        ...(team?.pageSetting?.team?.seo?.meta_description && { "description": team?.pageSetting?.team?.seo?.meta_description }),
        "mainEntity": team?.team?.map((member: any) => ({
            ...{
                "@type": "Person",
                "name": member?.name,
                "jobTitle": member?.position,
                "image": member?.imageData?.asset.url,
                "description": member?.description,
                "url": `${team?.profileSettings?.settings?.websiteName}/team/${member?.slug?.current}`,
            }
        }))
    };


    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />
            <div className="section">
                <div className="container">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{team?.pageSetting?.team?.title}</h2>
                        {team?.pageSetting?.team?.content &&
                            <div className="mt-10">
                                <ContentEditor
                                    content={team?.pageSetting?.team?.content}
                                />
                            </div>
                        }
                    </div>
                    <ul
                        role="list"
                        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                    >
                        {team?.team?.map((person: any) => {
                            return (
                                <TeamCard
                                    key={person?._id}
                                    name={person.name}
                                    position={person.position}
                                    image={person?.imageData?.asset?.url}
                                    slug={`team/${person.slug.current}`}
                                />
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}
