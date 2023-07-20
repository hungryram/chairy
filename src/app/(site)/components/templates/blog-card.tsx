import Image from "next/image"
import Link from "next/link";

interface Props {
    image: string;
    altText: string;
    blurData: string;
    title: string;
    slug: string;
    date: any
}

export default function BlogCard({
    image,
    altText,
    blurData,
    date,
    title,
    slug
}: Props) {

    return (
        <article
            className="relative isolate flex flex-col"
        >
            <div className="flex flex-wrap items-center gap-y-1 text-sm leading-6 text-gray-300">
                <div className="-ml-4 flex items-center gap-x-4">
                </div>
            </div>
            <h3 className="mt-3 text-xl font-semibold leading-6 text-white">
                {title}
            </h3>
            <time className="text-sm" dateTime={date}>{date}</time>
            <div className="mt-4">
                <Link href={slug} className="italic font-light underline">Read Article</Link>
            </div>
        </article>
    )
}
