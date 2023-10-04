import Image from "next/image"
import Link from "next/link";

interface Props {
    image: string;
    altText: string;
    blurData: string;
    title: string;
    slug: string;
    date: any;
    excerpt: string;
}

export default function BlogCard({
    image,
    altText,
    blurData,
    date,
    title,
    slug,
    excerpt
}: Props) {

    return (
        <article className="relative isolate flex flex-col gap-8 lg:flex-row">
            <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
                <Image
                    src={image}
                    alt={title}
                    fill={true}
                    className="absolute inset-0 h-full w-full object-contain"
                />
            </div>
            <div>
                <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={date} className="text-gray-500">
                        {date}
                    </time>
                </div>
                <div className="group relative max-w-xl text-left content">
                    <h3 className="mt-3 text-lg font-semibold leading-6">
                        <Link href={slug}>
                            <span className="absolute inset-0" />
                            {title}
                        </Link>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">{excerpt}</p>
                    <Link href={slug} className="accent italic text-sm">Read more...</Link>
                </div>

            </div>
        </article>
    )
}
