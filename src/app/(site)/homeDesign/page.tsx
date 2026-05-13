import { Metadata } from 'next';
import { client } from '../../../../sanity/lib/client';
import { homePageData } from '../../../../lib/groq-data';
import HomeDesignLanding from '../components/templates/home-design-landing';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function HomeDesignPreviewPage() {
  const data = await client.fetch(homePageData);

  return (
    <HomeDesignLanding
      pageBuilder={data?.homeAppearance?.homePage?.pageBuilder}
      contactEmail={data?.profileSettings?.contact_information?.email}
    />
  );
}
