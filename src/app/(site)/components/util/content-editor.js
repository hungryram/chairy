'use client'
import { PortableText } from "@portabletext/react";
import serializers from "./serializers"


export default function ContentEditor({ content }) {
    return (
        <PortableText
            components={serializers}
            value={content}
        />
    )
}