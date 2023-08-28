import { AiFillInstagram, AiFillRedditCircle, AiFillTwitterCircle, AiFillYoutube, AiFillFacebook, AiFillLinkedin } from "react-icons/ai"
import { FaYelp, FaTiktok } from "react-icons/fa"
import { BsPinterest } from "react-icons/bs"
import { SiZillow } from "react-icons/si"
import Styles from "./social.module.css"

export default function Social({
    facebook,
    youtube,
    instagram,
    twitter,
    reddit,
    linkedin,
    yelp,
    pinterest,
    tiktok,
    zillow,
    size
}: any) {

    return (
        <div className="py-4">
            <div className={Styles.socialComponent}>
                {facebook && <a href={facebook} target="_blank" rel="noreferrer" aria-label="Open link to facebook" title="Open link to facebook"><AiFillFacebook className={size} /></a>}
                {youtube && <a href={youtube} target="_blank" rel="noreferrer" aria-label="Open link to youtube" title="Open link to youtube"><AiFillYoutube className={size} /></a>}
                {instagram && <a href={instagram} target="_blank" rel="noreferrer" aria-label="Open link to instagram" title="Open link to instagram"><AiFillInstagram className={size} /></a>}
                {reddit && <a href={reddit} target="_blank" rel="noreferrer" aria-label="Open link to reddit" title="Open link to reddit"><AiFillRedditCircle className={size} /></a>}
                {linkedin && <a href={linkedin} target="_blank" rel="noreferrer" aria-label="Open link to linkedin" title="Open link to linkedin"><AiFillLinkedin className={size} /></a>}
                {yelp && <a href={yelp} target="_blank" rel="noreferrer" aria-label="Open link to yelp" title="Open link to yelp"><FaYelp className={size} /></a>}
                {pinterest && <a href={pinterest} target="_blank" rel="noreferrer" aria-label="Open link to pinterest" title="Open link to pinterest"><BsPinterest className={size} /></a>}
                {tiktok && <a href={tiktok} target="_blank" rel="noreferrer" aria-label="Open link to tiktok" title="Open link to tiktok"><FaTiktok className={size} /></a>}
                {zillow && <a href={zillow} target="_blank" rel="noreferrer" aria-label="Open link to zillow" title="Open link to zillow"><SiZillow className={size} /></a>}
                {twitter &&
                    <a href={twitter} arial-label="Open link to X" target="_blank" rel="noreferrer">
                        <svg width="1200" height="1227" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[1.3rem] h-[1.3rem]">
                            <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor" />
                        </svg>
                    </a>
                }
            </div>
        </div>
    )
}