import { FaInstagram, FaFacebook, FaXTwitter, FaTiktok, FaYoutube, FaReddit, FaLinkedin, FaYelp, FaPinterest } from "react-icons/fa6";
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
    size = 'w-6 h-6'
}: any) {

    return (
        <div className="py-4">
            <div className={Styles.socialComponent}>
                {instagram && <a href={instagram} target="_blank" rel="noreferrer" aria-label="Open link to instagram" title="Open link to instagram"><FaInstagram className={size} /></a>}
                {facebook && <a href={facebook} target="_blank" rel="noreferrer" aria-label="Open link to facebook" title="Open link to facebook"><FaFacebook className={size} /></a>}
                {twitter && <a href={twitter} aria-label="Open link to X" target="_blank" rel="noreferrer"><FaXTwitter className={size} /></a>}
                {tiktok && <a href={tiktok} target="_blank" rel="noreferrer" aria-label="Open link to tiktok" title="Open link to tiktok"><FaTiktok className={size} /></a>}
                {youtube && <a href={youtube} target="_blank" rel="noreferrer" aria-label="Open link to youtube" title="Open link to youtube"><FaYoutube className={size} /></a>}
                {reddit && <a href={reddit} target="_blank" rel="noreferrer" aria-label="Open link to reddit" title="Open link to reddit"><FaReddit className={size} /></a>}
                {linkedin && <a href={linkedin} target="_blank" rel="noreferrer" aria-label="Open link to linkedin" title="Open link to linkedin"><FaLinkedin className={size} /></a>}
                {yelp && <a href={yelp} target="_blank" rel="noreferrer" aria-label="Open link to yelp" title="Open link to yelp"><FaYelp className={size} /></a>}
                {pinterest && <a href={pinterest} target="_blank" rel="noreferrer" aria-label="Open link to pinterest" title="Open link to pinterest"><FaPinterest className={size} /></a>}
            </div>
        </div>
    )
}