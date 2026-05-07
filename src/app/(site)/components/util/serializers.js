import { urlForImage } from "../../../../../sanity/lib/image"
import getYouTubeID from 'get-youtube-id'

const serializers = {
    types: {
        youtube: ({ value }) => {
            const { url } = value || {}
            const id = getYouTubeID(url)
            const customHeight = value?.height
            const hasCustomHeight = customHeight !== undefined && customHeight !== null && customHeight !== ''
            const iframeHeight = typeof customHeight === 'number' ? `${customHeight}px` : customHeight

            if (!id) {
                return null
            }

            return (
                <div className={`my-10 w-full overflow-hidden rounded-lg ${hasCustomHeight ? '' : 'aspect-video'}`}>
                    <iframe
                        src={`https://www.youtube.com/embed/${id}?rel=0`}
                        title={value?.title || 'YouTube video'}
                        width={value?.width ?? '100%'}
                        height={hasCustomHeight ? iframeHeight : '100%'}
                        style={hasCustomHeight ? { height: iframeHeight } : undefined}
                        className={`w-full border-0 ${hasCustomHeight ? '' : 'h-full'}`}
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