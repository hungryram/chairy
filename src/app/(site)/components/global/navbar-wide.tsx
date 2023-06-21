'use client'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { NavbarProps } from './navbar'
import Image from 'next/image'
import Link from 'next/link'
import Styles from "./navbar-wide.module.css"

export default function NavbarWide({
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
}: NavbarProps) {

    const ctaLinking =
        (ctaLink?.internalLink?._type === "pages" && `/${ctaLink?.internalLink.slug}`) ||
        (ctaLink?.internalLink?._type === "blog" && `/blog/${ctaLink?.internalLink.slug}`) ||
        (ctaLink?.internalLink?._type === "legal" && `/legal/${ctaLink?.internalLink.slug}`) ||
        (ctaLink?.internalLink?._type === "services" && `/services/${ctaLink?.internalLink.slug}`) ||
        (ctaLink?.internalLink?._type === "team" && `/team/${ctaLink?.internalLink.slug}`) ||
        (ctaLink?.externalUrl && `${ctaLink?.externalUrl}`)

    return (
        <Disclosure as="nav" className={Styles.header}>
            {({ open }) => (
                <>
                    {enableTopHeader &&
                        <div className={`${Styles.topHeader}`}>
                            <div className="mx-auto px-2 sm:px-6 lg:px-8 p-3">
                                <div />
                                <div className="flex items-center space-x-6">
                                    {email && <a href={`mailto:${email}`} className="text-sm sm:block hidden">{email}</a>}
                                    {phone && <a href={`tel:${phone}`} className="text-sm sm:block hidden">Direct: {phone}</a>}
                                    {office && <a href={`tel:${office}`} className="text-sm">Office: {office}</a>}
                                </div>
                            </div>
                        </div>
                    }
                    <div className="mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:justify-start">
                                <div className="flex flex-shrink-0">
                                    <Link href="/">
                                        {logo ?
                                            <Image
                                                src={logo}
                                                width={logoWidth ? logoWidth : 150}
                                                height={10}
                                                className="hidden w-auto lg:block"
                                                alt={company_name}
                                            />
                                            :
                                            <h1 className="text-3xl">{company_name}</h1>
                                        }
                                        {logo ?
                                            <Image
                                                src={logo}
                                                width={mobileLogoWidth ? mobileLogoWidth : 100}
                                                height={10}
                                                alt={company_name}
                                                className="block w-auto lg:hidden"
                                            />
                                            :
                                            <h1 className="text-3xl">{company_name}</h1>
                                        }
                                    </Link>
                                </div>
                                <div className="hidden sm:ml-20 sm:block">
                                    <div className="flex items-center space-x-4">
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
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {!hideCta && ctaLinking &&
                                    <div className="lg:flex lg:flex-1 lg:justify-end">
                                        <Link href={ctaLinking ?? '/'} className="primary-button">
                                            {ctaLink?.text} <span aria-hidden="true">&rarr;</span>
                                        </Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
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
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
