import Image from "next/image"
import Link from "next/link";

interface Props {
    slug: string;
    image: string;
    position: string;
    name: string
}

export default function TeamCard({
    slug,
    image,
    position,
    name
}: Props) {
    return (
        <li>
            <Link href={slug}>
                <Image
                    className="aspect-[3/2] w-full rounded-sm object-cover"
                    src={image}
                    alt={name}
                    width={800}
                    height={800}
                />
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{name}</h3>
                <p className="text-base leading-7 text-gray-600">{position}</p>
            </Link>
        </li>
    )
}
