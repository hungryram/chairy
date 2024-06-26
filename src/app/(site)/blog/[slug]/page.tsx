import { getBlog } from '../../../../../lib/groq-data'
import Image from 'next/image'
import ContentSimple from '../../components/templates/content-simple'
import ShareSocial from '../../components/templates/share-social'
import { notFound } from 'next/navigation'
import { Metadata } from 'next';
import { format, parseISO } from 'date-fns'
import ContentEditor from '../../components/util/content-editor'
import Link from 'next/link'

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

export const revalidate = 0

// GENERATES SEO
export async function generateMetadata({ params }: Meta): Promise<Metadata> {
    const slug = params.slug
    const post = await getBlog(slug)

    return {
        title: post?.blog?.seo?.title_tag,
        description: post?.blog?.seo?.meta_description,
        alternates: {
            canonical: 'blog/' + post?.blog?.slug
        },
        openGraph: {
            title: post?.blog?.seo?.title_tag,
            description: post?.blog?.seo?.meta_description,
            url: 'blog/' + post?.blog?.slug,
            siteName: post?.profileSettings?.company_name,
            images: post?.blog?.imageData?.asset?.url,
            locale: 'en-US',
            type: 'article',
        },
        twitter: {
            title: post?.blog?.seo?.title_tag,
            description: post?.blog?.seo?.meta_description,
            creator: '@' + post?.profileSettings?.seo?.twitterHandle,
        },
        icons: {
            icon: post.appearances?.branding?.favicon?.asset?.url,
            shortcut: post.appearances?.branding?.favicon?.asset?.url,
            apple: post.appearances?.branding?.favicon?.asset?.url,
        },
        robots: {
            index: post?.blog?.seo?.noIndex ? false : true,
            follow: post?.blog?.seo?.noIndex ? false : true,
        }
    }
}

export default async function BlogSlug({ params }: Props) {
    const slug = params.slug
    const post = await getBlog(slug)

    if (!post?.blog) {
        notFound()
    }

    const postImage = post?.blog?.imageData?.asset
    const avatar = post?.blog?.author?.avatar?.asset

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        ...(post?.blog?.title && { "headline": post?.blog?.title }),
        "url": `${post?.profileSettings?.settings?.websiteName}/blog/${post?.blog?.slug}`,
        ...(post?.blog?.date && { "datePublished": post?.blog?.date }),
        ...(post?.blog?._updatedAt && { "dateModified": post?.blog?._updatedAt }),
        ...(post?.blog?.seo?.meta_description && { "description": post?.blog?.seo?.meta_description }),
        "image": {
            "@type": "ImageObject",
            ...(postImage?.url && { "url": postImage?.url }),
        },
        "author": {
            "@type": "Person",
            ...(post?.blog?.author?.name && { "name": post?.blog?.author?.name }),
        },
        "publisher": {
            "@type": "Organization",
            ...(post?.profileSettings?.company_name && { "name": post?.profileSettings?.company_name }),
            ...(post?.profileSettings?.settings?.websiteName && { "url": post?.profileSettings?.settings?.websiteName }),
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
            />
            <div className="px-6 py-36 lg:px-8">
                <div className="mx-auto max-w-3xl leading-7">
                    <div className="mb-10 text-center content">
                        <h1>{post?.blog?.title}</h1>
                        <time>{format(parseISO(post?.blog?.date), 'LLLL d, yyyy')}</time>
                    </div>
                    {post?.blog?.author?.name &&
                        <div className="flex justify-center items-center mx-auto mb-20">
                            <div className="mr-4 flex-shrink-0">
                                <Image
                                    src={avatar?.url}
                                    alt={avatar?.altText}
                                    placeholder={avatar?.lqip ? 'blur' : 'empty'}
                                    blurDataURL={avatar?.lqip}
                                    width={100}
                                    height={100}
                                    className="h-10 w-10 rounded-full"
                                />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold">{post.blog.author.name}</h4>
                            </div>
                        </div>
                    }
                    {postImage?.url &&
                        <Image
                            src={postImage?.url}
                            alt={postImage?.altText ? postImage?.altText : post?.blog?.title}
                            placeholder={postImage?.lqip ? 'blur' : 'empty'}
                            blurDataURL={postImage?.lqip}
                            width={1500}
                            height={800}
                            className="mb-10"
                        />
                    }
                    <div className="content">
                        <ContentEditor
                            content={post?.blog?.content}
                        />
                    </div>
                    <div className="mt-6 mb-10">
                        {/* <Link href="https://www.chairyapp.com/#download" className="primary-button !text-white !bg-[#7D0202]">Download the App</Link> */}
                        <div className="flex space-x-3">
                            <a href="https://apps.apple.com/us/app/chairy/id6463957222" target="_blank"><img src="https://cdn.sanity.io/images/ez8qjsla/production/0e92934930b948baf4a4f8cf7afd40343539871b-120x40.svg" width="140" /></a>
                            <a href="https://play.google.com/store/apps/details?id=com.chairyapp.chairy&hl=en_US&gl=US" target="_blank"><img src="https://cdn.sanity.io/images/ez8qjsla/production/b7710ef006d9bffe7346f20190d5e7c12e9285bd-564x168.png" width="150" /></a>
                        </div>
                    </div>
                    <div className="mt-6">
                        <ShareSocial
                            url={post?.profileSettings?.settings?.websiteName + '/blog/' + post?.blog?.slug}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
