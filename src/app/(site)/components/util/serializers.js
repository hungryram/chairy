import { urlForImage } from "../../../../../sanity/lib/image"
import getYouTubeID from 'get-youtube-id'
import Youtube from "react-youtube"

const serializers = {
    types: {
        youtube: ({ value }) => {

            const opts = {
                height: `${value.height ?? '600'}`,
                width: `${value.width ?? '400'}`,
                playerVars: {
                    // https://developers.google.com/youtube/player_parameters
                    autoplay: 0,
                },
            };

            const { url } = value
            const id = getYouTubeID(url)
            return (<Youtube videoId={id} opts={opts} />)
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