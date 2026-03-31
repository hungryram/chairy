"use client";

import { FormEvent, useState } from 'react';

interface NewsletterFormProps {
  sourcePage: string;
  compact?: boolean;
}

export default function NewsletterForm({ sourcePage, compact = false }: NewsletterFormProps) {
  const [pending, setPending] = useState(false);
  const [state, setState] = useState({ success: false, message: '' });

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

  return (
    <form onSubmit={handleSubmit} className={compact ? 'space-y-2' : 'space-y-3'}>
      <label className="hidden" htmlFor="name-honey" />
      <input className="hidden" type="text" name="name-honey" />
      <input type="hidden" name="sourcePage" value={sourcePage} />

      {compact ? (
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor={`newsletter-email-${sourcePage}`} className="sr-only">
            Email address
          </label>
          <input
            id={`newsletter-email-${sourcePage}`}
            name="Email"
            type="email"
            required
            placeholder="Email address"
            className="w-full border-0 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/65"
          />
          <button
            type="submit"
            disabled={pending}
            className="primary-button whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {pending ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
      ) : (
        <>
          <div>
            <label htmlFor={`newsletter-email-${sourcePage}`} className="text-sm block mb-1">
              Email address
            </label>
            <input
              id={`newsletter-email-${sourcePage}`}
              name="Email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-md border border-white/20 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-white/70 focus:border-white/60 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="primary-button disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {pending ? 'Subscribing...' : 'Subscribe'}
          </button>
        </>
      )}

      {state?.message && (
        <p className={`text-xs ${state.success ? 'text-emerald-300' : 'text-rose-300'}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
