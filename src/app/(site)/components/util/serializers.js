import { urlForImage } from "../../../../../sanity/lib/image"
import getYouTubeID from 'get-youtube-id'

const serializers = {
    types: {
        youtube: ({ value }) => {
            const { url } = value || {}
            const id = getYouTubeID(url)

            if (!id) {
                return null
            }

            return (
                <div className="my-4 aspect-video w-full overflow-hidden rounded-lg">
                    <iframe
                        src={`https://www.youtube.com/embed/${id}?rel=0`}
                        title={value?.title || 'YouTube video'}
                        width={value?.width ?? '100%'}
                        height={value?.height ?? '100%'}
                        className="h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )
        },
        image: ({ value }) => {
            return (
                <div className={
                    `relative inline-block  mr-3 ${value.imageAlign == 'left' && 'justify-start' || value.imageAlign == 'center' && 'justify-center' || value.imageAlign =='right' && 'justify-end'}`
                }>
                        {value.link ? <a href={value.link} target="_blank"><img src={value.asset !== undefined && urlForImage(value).url()} alt={value.altTag} width={value.imageWidth} className="my-2"/></a> : <img src={value.asset !== undefined && urlForImage(value).url()} alt={value.altTag} width={value.imageWidth} className="my-6"/>}
                </div>
            )
        },
    },
    marks: {
        link: ({ value, children }) => {
            return (
                <a href={value.href} target={value.newTab ? '_blank' : '_self'} className="accent">{children}</a>
            )
        },
        color: ({ value, children }) => {
            return (
                <span style={{ color: value?.hex }}>{children}</span>
            )
        },
        gradient: ({ children }) => (
            <span className="gradient-accent">{children}</span>
        )
    }
}

export default serializers