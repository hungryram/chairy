"use client";

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

const DISMISS_KEY = 'newsletter-popup-dismissed-until';
const SHOW_DELAY_MS = 3500;
const HIDE_FOR_MS = 1000 * 60 * 60 * 24 * 7;

export default function NewsletterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [state, setState] = useState({ success: false, message: '' });

  useEffect(() => {
    const rawValue = window.localStorage.getItem(DISMISS_KEY);
    const dismissedUntil = rawValue ? Number(rawValue) : 0;

    let timer: NodeJS.Timeout | undefined;

    if (dismissedUntil <= Date.now()) {
      timer = window.setTimeout(() => {
        setOpen(true);
      }, SHOW_DELAY_MS);
    }

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  useEffect(() => {
    if (state?.success) {
      const nextDismissUntil = Date.now() + HIDE_FOR_MS;
      window.localStorage.setItem(DISMISS_KEY, String(nextDismissUntil));
      const timer = window.setTimeout(() => setOpen(false), 1500);
      return () => window.clearTimeout(timer);
    }
  }, [state?.success]);

  const sourcePage = useMemo(() => pathname || '/', [pathname]);

  const dismissPopup = () => {
    const nextDismissUntil = Date.now() + HIDE_FOR_MS;
    window.localStorage.setItem(DISMISS_KEY, String(nextDismissUntil));
    setOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    setPending(true);
    setState({ success: false, message: '' });

    try {
      const formData = new FormData(form);

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: formData,
      });

      const payload = await response.json();

      setState({
        success: Boolean(payload?.success),
        message: payload?.message || 'Something went wrong. Please try again.'
      });

      if (payload?.success) {
        form.reset();
      }
    } catch (error) {
      console.error(error);
      setState({ success: false, message: 'Something went wrong. Please try again.' });
    } finally {
      setPending(false);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-black/45" onClick={dismissPopup} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900 p-6 text-white shadow-2xl">
        <button
          type="button"
          aria-label="Close newsletter popup"
          onClick={dismissPopup}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm hover:bg-white/20"
        >
          x
        </button>

        <p className="text-xs uppercase tracking-[0.2em] text-white/70">Stay Connected</p>
        <h3 className="mt-2 text-2xl font-bold leading-tight">Get newsletter updates</h3>
        <p className="mt-2 text-sm text-white/80">
          New posts, practical tips, and local marketing ideas sent to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <label className="hidden" htmlFor="name-honey" />
          <input className="hidden" type="text" name="name-honey" />
          <input type="hidden" name="sourcePage" value={sourcePage} />

          <label htmlFor="newsletter-email" className="text-sm font-medium">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="Email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-md border border-white/20 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:border-white/60 focus:outline-none"
          />

          <button
            type="submit"
            disabled={pending}
            className="primary-button w-full disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {pending ? 'Subscribing...' : 'Subscribe'}
          </button>

          {state?.message && (
            <p className={`text-xs ${state.success ? 'text-emerald-300' : 'text-rose-300'}`}>
              {state.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
