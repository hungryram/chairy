import Image from 'next/image';
import Link from 'next/link';
import FloatingPhoneHero from './floating-phone-hero';

interface HomeDesignLandingProps {
  pageBuilder?: any[];
  contactEmail?: string;
}

const APPLE_STORE_LINK = 'https://apps.apple.com/us/app/chairy/id6463957222';
const GOOGLE_PLAY_LINK = 'https://play.google.com/store/apps/details?id=com.chairyapp.chairy&hl=en_US&gl=US';
const APPLE_BADGE = 'https://cdn.sanity.io/images/ez8qjsla/production/0e92934930b948baf4a4f8cf7afd40343539871b-120x40.svg';
const GOOGLE_BADGE = 'https://cdn.sanity.io/images/ez8qjsla/production/b7710ef006d9bffe7346f20190d5e7c12e9285bd-564x168.png';

function collectImageUrls(input: unknown, output: string[] = []): string[] {
  if (!input) return output;

  if (typeof input === 'string') {
    const isImage = /(https?:\/\/.*\.(png|jpe?g|webp|avif|gif)$)|(cdn\.sanity\.io\/images\/)/i.test(input);
    if (isImage) output.push(input);
    return output;
  }

  if (Array.isArray(input)) {
    input.forEach((entry) => collectImageUrls(entry, output));
    return output;
  }

  if (typeof input === 'object') {
    Object.values(input as Record<string, unknown>).forEach((value) => collectImageUrls(value, output));
  }

  return output;
}

export default function HomeDesignLanding({ pageBuilder = [], contactEmail }: HomeDesignLandingProps) {
  const imagePool = Array.from(new Set(collectImageUrls(pageBuilder)));

  const heroImage = imagePool[0] ?? 'https://images.unsplash.com/photo-1503951458645-643d53bfd90f?auto=format&fit=crop&w=1200&q=80';
  const supportImage = imagePool[1] ?? heroImage;
  const appProofImages = [
    'https://cdn.sanity.io/images/ez8qjsla/production/6ca2df017c9bcb7cb085e152a856b7ab3af4ecd6-4992x4920.webp?auto=format&w=1200&q=72',
    'https://cdn.sanity.io/images/ez8qjsla/production/8901bc29b5e31fa9dce31585b80d3f715a96f25f-4992x4920.webp?auto=format&w=1200&q=72',
    'https://cdn.sanity.io/images/ez8qjsla/production/f522357012888f5941af4e331ef0deef8d0f19d6-4992x4920.webp?auto=format&w=1200&q=72',
    'https://cdn.sanity.io/images/ez8qjsla/production/ca284cf0ef93d709b2992a988e41475900566be7-4992x4920.webp?auto=format&w=1200&q=72',
  ];

  const steps = ['List your available chairs', 'Set your price and availability', 'Start earning from unused space'];

  const foundingBenefits = [
    '6 months of premium features, free',
    'Priority placement in search',
    'Founding Shop badge',
    'Featured across Chairy marketing and social',
  ];

  const whyChairy = [
    'No contracts or long-term commitments',
    'Earn from chairs you already have',
    'Designed specifically for barbershops',
    'Simple, fast, mobile-first',
  ];

  const joinEarlyLink = contactEmail ? `mailto:${contactEmail}` : APPLE_STORE_LINK;

  return (
    <main className="relative isolate overflow-hidden bg-[#050607] text-[#f4f5f6]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(75rem 45rem at 18% -10%, rgba(238,76,44,0.08), transparent 60%), radial-gradient(65rem 40rem at 85% 20%, rgba(253,175,107,0.04), transparent 60%)',
        }}
      />

      <section className="relative mx-auto grid container gap-8 px-4 pb-12 pt-40 md:grid-cols-2 md:items-center md:pt-28 lg:px-8">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#fdaf6b]">Welcome to Chairy</p>
          <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
            Stop Letting Empty Chairs Cost You Money
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#c7cad1]">
            Chairy helps barbershops turn unused chairs into income by connecting you with barbers and stylists
            looking for space, on demand.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="#list-your-shop" className="primary-button !bg-[#EE4C2C] !text-white">
              List Your Shop (Founding Access)
            </Link>
            <Link href="#download-app" className="text-sm font-semibold text-[#c7cad1] underline underline-offset-4">
              Download the App
            </Link>
          </div>
          <p className="mt-3 text-sm text-[#9ca3af]">No contracts. Setup takes minutes.</p>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <FloatingPhoneHero image={heroImage} altText="Chairy app screen showing chair booking interface" />
        </div>
      </section>

      <section id="list-your-shop" className="mx-auto container px-4 py-6 lg:px-8">
        <div className="content rounded-2xl border border-white/[0.03] p-6 md:p-8" style={{ backgroundImage: 'radial-gradient(600px at 50% 50%, rgba(238,76,44,0.03), transparent 80%)' }}>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#fdaf6b]">Founding Offer</p>
          <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Be One of the First 200 Barbershops on Chairy
          </h2>
          <p className="mt-4 max-w-3xl text-[#d0d4db]">
            Early shops get priority visibility, premium features, and a head start before the platform scales.
          </p>

          <div className="mt-6 rounded-xl border border-white/[0.04] bg-black/20 p-4 md:p-6">
            <div className="grid gap-x-8 gap-y-3 md:grid-cols-2">
              {foundingBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <span className="mt-[0.5rem] inline-block h-2 w-2 flex-shrink-0 rounded-full bg-[#EE4C2C]" />
                  <p className="text-sm leading-6 text-[#e8ebef] md:text-base">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Link href="#list-your-shop" className="primary-button inline-flex !bg-[#EE4C2C] !text-white">
              Secure Your Spot
            </Link>
            <p className="mt-2 text-sm font-normal text-[#fdaf6b]/80">Only 200 spots available.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid container gap-8 px-4 py-12 md:grid-cols-2 md:items-center lg:px-8">
        <div className="content">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Every Empty Chair Is Lost Revenue</h2>
          <p className="mt-5 text-[#c7cad1]">Slow days, cancellations, and unused chairs quietly cost barbershops money every week.</p>
          <p className="mt-4 text-[#c7cad1]">
            At the same time, barbers and stylists are actively looking for places to work. Chairy connects both, so
            your space does not sit idle.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.02]" style={{ backgroundImage: 'radial-gradient(800px at 50% 50%, rgba(253,175,107,0.02), transparent 80%)' }}>
          <Image
            src={supportImage}
            alt="Barbershop with available chair"
            width={1200}
            height={900}
            className="h-[360px] w-full rounded-xl object-cover"
          />
        </div>
      </section>

      <section className="mx-auto container px-4 py-6 lg:px-8">
        <div className="content rounded-2xl border border-white/[0.02] p-6 md:p-8" style={{ backgroundImage: 'radial-gradient(600px at 50% 50%, rgba(238,76,44,0.02), transparent 80%)' }}>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Get Started in Minutes</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step} className="rounded-lg border border-white/[0.02] bg-white/[0.005] p-4">
                <p className="text-sm font-semibold text-[#fdaf6b]">Step {i + 1}</p>
                <p className="mt-2 text-lg font-semibold text-[#f4f5f6]">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="#list-your-shop" className="primary-button !bg-[#EE4C2C] !text-white">
              List Your Shop
            </Link>
          </div>
        </div>
      </section>

      <section id="download-app" className="mx-auto container px-4 py-12 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between content">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Manage Everything From Your Phone</h2>
            <p className="mt-4 max-w-3xl text-[#c7cad1]">Browse listings, view chair details, complete booking flow, and publish your listing in under a minute.</p>
          </div>
          <div className="flex gap-3">
            <a href={APPLE_STORE_LINK} target="_blank" rel="noreferrer" aria-label="Download on App Store">
              <img src={APPLE_BADGE} width="140" alt="Download on the App Store" />
            </a>
            <a href={GOOGLE_PLAY_LINK} target="_blank" rel="noreferrer" aria-label="Get it on Google Play">
              <img src={GOOGLE_BADGE} width="150" alt="Get it on Google Play" />
            </a>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {appProofImages.map((img, i) => (
            <figure key={`${img}-${i}`} className="overflow-hidden rounded-lg border border-white/[0.02] p-1" style={{ backgroundImage: 'radial-gradient(400px at 50% 50%, rgba(255,255,255,0.01), transparent 90%)' }}>
              <Image
                src={img}
                alt={`Chairy app screen ${i + 1}`}
                width={1200}
                height={1200}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                quality={72}
                className="h-[360px] w-full rounded-md object-cover md:h-[390px]"
              />
              <figcaption className="px-2 pb-2 h-full text-sm text-[#9ca3af] text-center py-8">
                {i === 0 && 'See demand in your area instantly'}
                {i === 1 && 'Get booked without calls or DMs'}
                {i === 2 && 'List your chair in under a minute'}
                {i === 3 && 'Manage updates from your phone'}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto container px-4 py-6 lg:px-8">
        <div className="content rounded-2xl border border-white/5 p-6 md:p-8">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Built for Real Barbershops</h2>
          <div className="mt-6 rounded-xl bg-black/20 p-4 md:p-6">
            <div className="grid gap-x-8 gap-y-3 md:grid-cols-2">
              {whyChairy.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-[0.5rem] inline-block h-2 w-2 flex-shrink-0 rounded-full bg-[#EE4C2C]" />
                  <p className="text-sm leading-6 text-[#e8ebef] md:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="join-early" className="mx-auto container px-4 py-6 lg:px-8">
        <div className="content rounded-2xl border border-[#fdaf6b]/[0.03] p-6 md:p-8">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">For Barbers and Stylists</h2>
          <p className="mt-4 max-w-3xl text-[#c7cad1]">
            We are onboarding barbershops first. Join early to be notified when chairs become available near you.
          </p>
          <div className="mt-7">
            <a href={joinEarlyLink} className="secondary-button !bg-transparent !text-[#fdaf6b] !border !border-[#fdaf6b]">
              Join Early Access
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto container px-4 py-6 lg:px-8">
        <div className="content grid gap-6 rounded-2xl border border-white/[0.02] p-6 md:grid-cols-2 md:items-center md:p-8" style={{ backgroundImage: 'radial-gradient(800px at 50% 50%, rgba(238,76,44,0.02), transparent 80%)' }}>
          <div>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Built by Someone in the Industry</h2>
            <p className="mt-4 text-[#c7cad1]">
              Chairy was created after seeing the same issue daily, empty chairs in shops, while barbers struggled to
              find places to work. This platform was built to fix that.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-white/[0.02] min-h-[500px]">
            <iframe
              className="aspect-video w-full h-[500px]"
              src="https://www.youtube.com/embed/AvrhZwMdY0M"
              title="Chairy founder message"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="mx-auto container px-4 pb-16 pt-12 lg:px-8">
        <div className="content p-6 text-center md:p-8">
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">Start Turning Empty Chairs Into Income</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="#list-your-shop" className="primary-button !bg-[#EE4C2C] !text-white">
              List Your Shop
            </Link>
            <a href={APPLE_STORE_LINK} target="_blank" rel="noreferrer" className="secondary-button !bg-transparent !text-[#fdaf6b] !border !border-[#fdaf6b]">
              Download the App
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
