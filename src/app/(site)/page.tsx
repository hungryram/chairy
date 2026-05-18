import { client } from '../../../sanity/lib/client';
import HomeDesignLanding from './components/templates/home-design-landing';
import { homePageData } from '../../../lib/groq-data';
export const revalidate = 0

export default async function Home() {

  const data = await client.fetch(homePageData)

  return (
    <HomeDesignLanding
      pageBuilder={data.homeAppearance?.homePage?.pageBuilder}
      contactEmail={data?.profileSettings?.contact_information?.email}
    />
  )
}