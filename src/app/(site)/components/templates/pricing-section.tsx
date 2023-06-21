import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { pricingTiers } from '../../../../../sample/data';
import Styles from "./pricing.module.css"
import HeaderSection from './header-section';

interface Props {
    name: string;
    price: string;
    href: string;
    features: string[],
    description: string,
    packageType: string;
    ctaText: string;
    packageBackground: any
    packageTextColor: any
}

interface Pricing {
    packages: any;
    columnNumber: number;
    content: any;
    textAlign: string;
    primaryButtonLink: string;
    primaryButtonText: string;
    primaryButtonStyle: any;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    secondaryButtonStyle: any;
    backgroundStyles: any;
    packageBackground: any;
    packageTextColor: any;
    paddingTop: string;
    paddingBottom: string;
}

export function PricingTable({
    name,
    price,
    href,
    features,
    description,
    packageType,
    ctaText,
    packageBackground,
    packageTextColor
}: Props) {
    return (
        <div className="mx-2 rounded-sm" style={{
            backgroundColor: packageBackground,
            color: packageTextColor
        }}>
            <div className="lg:px-8 xl:px-14 p-8">
                {name &&
                    <h3 id={name.replace(/ /g, '')} className="text-base font-semibold leading-7">
                        {name}
                    </h3>
                }
                <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-5xl font-bold tracking-tight">{price}</span>
                    {packageType && <span className="text-sm font-semibold leading-6 opacity-90">/{packageType}</span>}
                </p>
                {href &&
                    <a
                        href={href}
                        aria-describedby={name}
                        className={Styles.pricingCta}
                    >
                        {ctaText}
                    </a>
                }
                {description && <p className="mt-10 text-sm font-semibold leading-6">{description}</p>}
                {features &&
                    <ul role="list" className="mt-6 space-y-3 text-sm leading-6">
                        {features?.map((feature: string) => {
                            return (
                                <li key={feature.replace(/ /g, '')} className="flex gap-x-3">
                                    <CheckCircleIcon className="h-6 w-5 flex-none accent" aria-hidden="true" />
                                    <span className="opacity-90">{feature}</span>
                                </li>
                            )
                        })}
                    </ul>
                }
            </div>
        </div>
    )
}

export default function PricingSection({
    packages,
    columnNumber,
    content,
    textAlign,
    primaryButtonLink,
    primaryButtonText,
    primaryButtonStyle,
    secondaryButtonLink,
    secondaryButtonText,
    secondaryButtonStyle,
    backgroundStyles,
    packageBackground,
    packageTextColor,
    paddingTop,
    paddingBottom,
}: Pricing) {

    const styles = {
        paddingTop: paddingTop ?? '5rem',
        paddingBottom: paddingBottom ?? '5rem',
      }
    
      const allStyles = { ...backgroundStyles, ...styles }

    return (
        <div style={allStyles}>
            <div className="container">
                {(content || primaryButtonLink || secondaryButtonLink) && (
                    <HeaderSection
                        content={content}
                        textAlign={textAlign}
                        // PRIMARY
                        buttonLink={primaryButtonLink}
                        primaryButtonText={primaryButtonText}
                        primaryButtonStyle={primaryButtonStyle}
                        // SECONDARY
                        secondaryButtonLink={secondaryButtonLink}
                        secondaryButtonText={secondaryButtonText}
                        secondaryButtonStyle={secondaryButtonStyle}
                    />
                )}
                <div className={`flow-root ${content && 'mt-16'}`}>
                    <div className={`${Styles.pricingGrid} grid lg:grid-cols-${columnNumber} grid-cols-1`}>
                        {packages ? packages?.map((node: any, i: any) => {
                            return (
                                <PricingTable
                                    key={i}
                                    name={node?.name}
                                    price={node?.price}
                                    packageType={node?.packageType}
                                    ctaText={node?.buttonText}
                                    href={node?.link}
                                    features={node?.details}
                                    description={node?.content}
                                    packageBackground={packageBackground}
                                    packageTextColor={packageTextColor}
                                />
                            )
                        })
                            :
                            pricingTiers?.map((node, i) => {
                                return (
                                    <PricingTable
                                        key={i}
                                        name={node?.name}
                                        price={node?.price}
                                        packageType={node?.packageType}
                                        features={node?.features}
                                        href={node?.href}
                                        ctaText={node?.ctaText}
                                        description={node?.description}
                                        packageBackground={packageBackground}
                                        packageTextColor={packageTextColor}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
