'use client'
import { Popover, Transition, Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import Styles from "./navbar.module.css"

export interface NavbarProps {
  company_name: string
  logo: string;
  navItems: any;
  logoWidth: number;
  phone: string;
  email: string;
  office: string;
  backgroundColor: string;
  enableTopHeader: boolean;
  ctaLink: any;
  mobileLogoWidth: number;
  hideCta: boolean;
  enableTransparent: boolean;
}

export default function Example({
  company_name,
  logo,
  navItems,
  logoWidth,
  phone,
  email,
  office,
  enableTopHeader,
  ctaLink,
  mobileLogoWidth,
  hideCta,
  enableTransparent
}: NavbarProps) {


  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const ctaLinking =
    (ctaLink?.internalLink?._type === "pages" && `/${ctaLink?.internalLink.slug}`) ||
    (ctaLink?.internalLink?._type === "blog" && `/blog/${ctaLink?.internalLink.slug}`) ||
    (ctaLink?.internalLink?._type === "legal" && `/legal/${ctaLink?.internalLink.slug}`) ||
    (ctaLink?.internalLink?._type === "services" && `/services/${ctaLink?.internalLink.slug}`) ||
    (ctaLink?.internalLink?._type === "team" && `/team/${ctaLink?.internalLink.slug}`) ||
    (ctaLink?.externalUrl && `${ctaLink?.externalUrl}`)

  // Sets logo condition based on scroll events. When scrolling, logo decreases by 30%
  const logoScroll = scroll ? (logoWidth ?? '200') * 0.7 : logoWidth ?? '200';

  // Sets mobile logo condition based on scroll events. When scrolling, logo decreases by 30%
  const mobileLogoScroll = scroll ? (mobileLogoWidth ?? '140') * 0.7 : mobileLogoWidth ?? '140';

  return (
    <>
      <header className={`${Styles.header} ${scroll ? Styles.stickyHeader : '-top-52'} ease-in-out transition-all duration-700 ${enableTransparent ? 'absolute left-0 right-0 z-50 top-0' : 'shadow'}`}>
        {enableTopHeader &&
          <div className={`${Styles.topHeader} ${scroll && 'hidden'}`}>
            <div className={Styles.topHeaderContainer}>
              <div />
              <div className="flex items-center space-x-6">
                {email && <a href={`mailto:${email}`} className="text-sm">{email}</a>}
                {phone && <a href={`tel:${phone}`} className="text-sm">Direct: {phone}</a>}
                {office && <a href={`tel:${office}`} className="text-sm">Office: {office}</a>}
              </div>
            </div>
          </div>
        }
        <nav className={Styles.navWrapper} aria-label="Global">
          <div className={Styles.desktopLogoContainer}>
            <Link href="/">
              {logo ?
                <Image
                  src={logo}
                  width={logoScroll}
                  height={10}
                  alt={company_name}
                />
                :
                <h1 className="text-3xl">{company_name}</h1>
              }
            </Link>
          </div>
          <div className={Styles.desktopMenuContainer}>
            {navItems?.map((link: any) => {

              const menuLinks =
                (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) ||
                (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) ||
                (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) ||
                (link.internalLink?._type === "services" && `/services/${link.internalLink.slug}`) ||
                (link.internalLink?._type === "team" && `/team/${link.internalLink.slug}`) ||
                (link.externalUrl && `${link.externalUrl}`)

              if (link?.subMenu?.length > 0) {
                return (
                  <Popover className="relative" key={link._key}>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={`${Styles.navLinks}`}
                        >
                          {link?.text}
                          <ChevronDownIcon
                            className={`ml-2 h-4 w-4`}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className={Styles.desktopPopOverPanel}>
                            <div className="rounded-sm shadow-lg overflow-hidden">
                              <div className={Styles.desktopDropDown}>
                                {link?.subMenu?.map((sub: any) => {

                                  const subMenuLinks =
                                    (sub.internalLink?._type === "blog" && `/blog/${sub.internalLink.slug}`) ||
                                    (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug}`) ||
                                    (sub.internalLink?._type === "pages" && `/${sub.internalLink.slug}`) ||
                                    (sub.internalLink?._type === "services" && `/services/${sub.internalLink.slug}`) ||
                                    (sub.internalLink?._type === "team" && `/team/${sub.internalLink.slug}`) ||
                                    (sub.externalUrl && `${sub.externalUrl}`)

                                  return (
                                    <Popover.Button
                                      as={Link}
                                      key={sub._key}
                                      href={subMenuLinks ?? '/'}
                                      target={sub.newTab && '_blank'}
                                      className={`${Styles.navLinks} text-black py-2`}
                                    >
                                      {sub.text}
                                    </Popover.Button>
                                  )
                                })}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                )
              } else {
                return (
                  <Link
                    key={link._id}
                    href={menuLinks}
                    className={Styles.navLinks}>
                    {link.text}
                  </Link>
                )
              }
            })}
          </div>
          {!hideCta && ctaLinking &&
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link href={ctaLinking ?? '/'} className="primary-button">
                {ctaLink?.text} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          }
        </nav>
      </header>

      {/* MOBILE */}

      <Disclosure as="nav" className={`${Styles.mobileHeaderMenu} ${scroll ? Styles.stickyHeader : '-top-52'} ease-in-out transition-all duration-700 ${enableTransparent ? 'absolute left-0 right-0 z-50 top-0' : 'shadow'}`}>
        {({ open }) => (
          <>
            {enableTopHeader &&
              <div className={`${Styles.topHeader} ${scroll && 'hidden'}`}>
                <div className={ctaLinking ? 'flex items-center space-x-6 h-full justify-end' : 'py-4'}>
                  {ctaLinking &&
                    <Link href={ctaLinking ?? '/'} className="h-full px-8 py-2 font-normal">
                      {ctaLink?.text} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  }
                </div>
              </div>
            }
            <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      {logo ?
                        <Image
                          src={logo}
                          width={mobileLogoScroll}
                          height={10}
                          alt={company_name}
                        />
                        :
                        <h1 className="text-3xl">{company_name}</h1>
                      }
                    </Link>
                  </div>
                </div>
                <div className="-mr-2 flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className={Styles.mobileDisclosureButton}>
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 pb-3 pt-2 px-4">
                {navItems?.map((link: any) => {
                  const menuLinks =
                    (link.internalLink?._type === "pages" && `/${link.internalLink.slug}`) ||
                    (link.internalLink?._type === "blog" && `/blog/${link.internalLink.slug}`) ||
                    (link.internalLink?._type === "legal" && `/legal/${link.internalLink.slug}`) ||
                    (link.internalLink?._type === "services" && `/services/${link.internalLink.slug}`) ||
                    (link.internalLink?._type === "team" && `/team/${link.internalLink.slug}`) ||
                    (link.externalUrl && `${link.externalUrl}`)

                  if (link?.subMenu?.length > 0) {
                    return (
                      <Popover className="relative" key={link._key}>
                        {({ open }) => (
                          <>
                            <Popover.Button
                              className={'group rounded-md inline-flex items-center outline-non'}
                            >
                              <span className={Styles.navLinks}>{link?.text}</span>
                              <ChevronDownIcon
                                className={`ml-2 h-4 w-4`}
                                aria-hidden="true"
                              />
                            </Popover.Button>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="z-50 -ml-4 transform px-2 w-screen max-w-xs sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                <div className="overflow-hidden">
                                  <div className="relative grid lg:bg-white px-5 py-3">
                                    {link?.subMenu?.map((sub: any) => {

                                      const subMenuLinks =
                                        (sub.internalLink?._type === "blog" && `/blog/${sub.internalLink.slug}`) ||
                                        (sub.internalLink?._type === "legal" && `/legal/${sub.internalLink.slug}`) ||
                                        (sub.internalLink?._type === "pages" && `/${sub.internalLink.slug}`) ||
                                        (sub.internalLink?._type === "services" && `/services/${sub.internalLink.slug}`) ||
                                        (sub.internalLink?._type === "team" && `/team${sub.internalLink.slug}`) ||
                                        (sub.externalUrl && `${sub.externalUrl}`)

                                      return (
                                        <Disclosure.Button as={Link} href={subMenuLinks ?? '/'} className={Styles.navLinks} target={sub.newTab && '_blank'} key={sub._key}>
                                          {sub.text}
                                        </Disclosure.Button>
                                      )
                                    })}
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    )
                  } else {
                    return (
                      <Disclosure.Button as={Link} href={menuLinks ?? '/'} className={Styles.navLinks} target={link.newTab && '_blank'} key={link._key}>
                        {link.text}
                      </Disclosure.Button>
                    )
                  }
                })}
              </div>
              <div className={Styles.mobileDropDownContact}>
                {ctaLinking &&
                  <div className="mb-6">
                    <Disclosure.Button as={Link} href={ctaLinking ?? '/'} className="primary-button block text-center mx-4">
                      {ctaLink?.text} <span aria-hidden="true">&rarr;</span>
                    </Disclosure.Button>
                  </div>
                }
                <div className="px-4">
                  <div className="items-center space-y-3 opacity-80 grid grid-cols-1">
                    {email && <a href={`mailto:${email}`} className="text-sm"><span className="font-semibold">Email:</span> {email}</a>}
                    {phone && <a href={`tel:${phone}`} className="text-sm"><span className="font-semibold">Direct:</span> {phone}</a>}
                    {office && <a href={`tel:${office}`} className="text-sm"><span className="font-semibold">Office:</span> {office}</a>}
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}
