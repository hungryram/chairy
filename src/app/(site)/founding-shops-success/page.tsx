import Link from 'next/link';
import type { Metadata } from 'next';
import CopyCodeButton from './copy-code-button';

export const metadata: Metadata = {
  title: 'Request Received | Chairy',
  description: 'Thanks for submitting your founding shop request. Our team will review and follow up shortly.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function FoundingShopsSuccessPage() {
  return (
    <main className="bg-[#0c0c0d] text-zinc-100">
      <section className="mx-auto max-w-5xl px-4 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-400/10 text-emerald-300">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">You're Almost In!</h1>
          <h2 className="mt-3 text-2xl font-semibold text-zinc-100 sm:text-3xl">One More Step to Secure Your Founding Shop Spot</h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            We've received your interest form! Complete your free account registration in the Chairy app to secure your spot among our first 200 Founding Shops.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-white/10 bg-zinc-800/70 px-6 py-6 text-center">
          <p className="flex items-center justify-center gap-3 text-3xl font-bold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-400/10 text-emerald-300">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>Getting Started Is FREE!</span>
          </p>
          <p className="mt-3 text-lg text-zinc-300">
            List one chair at one location with our free plan. No subscription or credit card required.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <h3 className="text-center text-3xl font-bold text-white">Here's How to Get Started</h3>

          <div className="mt-8 space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-2xl font-bold text-white">1</div>
              <div>
                <p className="text-2xl font-bold text-white">Download Chairy</p>
                <p className="mt-2 text-zinc-300">Download the app and create your free Shop Owner account.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-2xl font-bold text-white">2</div>
              <div>
                <p className="text-2xl font-bold text-white">Set Up Your Shop</p>
                <p className="mt-2 text-zinc-300">Add your shop details, available chairs or suites, and rental pricing.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-2xl font-bold text-white">3</div>
              <div>
                <p className="text-2xl font-bold text-white">Want More? Get 6 Months Free!</p>
                <p className="mt-2 text-zinc-300">
                  For additional chairs or locations, select a subscription plan and use promo code <span className="font-medium text-white">WELCOME6M</span>. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-normal text-zinc-400">Founding shop promo code</p>
          <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-zinc-900 px-4 py-2">
            <span className="text-4xl font-medium tracking-tight text-orange-500 sm:text-5xl">WELCOME6M</span>
            <CopyCodeButton code="WELCOME6M" />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl text-center">
          <p className="text-2xl font-bold text-white">Download Chairy & Secure Your Spot</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://apps.apple.com/us/app/chairy/id6761076049"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              aria-label="Download on the App Store"
            >
              <img
                src="https://cdn.sanity.io/images/ez8qjsla/production/0e92934930b948baf4a4f8cf7afd40343539871b-120x40.svg"
                alt="Download on the App Store"
                className="h-14 w-auto"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.chairyapp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              aria-label="Get it on Google Play"
            >
              <img
                src="https://cdn.sanity.io/images/ez8qjsla/production/b7710ef006d9bffe7346f20190d5e7c12e9285bd-564x168.png"
                alt="Get it on Google Play"
                className="h-14 w-auto"
              />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
