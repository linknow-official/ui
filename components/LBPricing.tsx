
/* eslint-disable no-case-declarations */
import { ConversionType, getConversionType, getCountry, getPlatformIcon, getPricingTypeCode, Platform, Pricing, PricingType } from 'unicpeak/helpers/left-byte'
import { useLBTheme } from 'unicpeak/hooks/useLBTheme'
import { LBView } from 'unicpeak/primitives/LBView'
import { LBPricingItem, LBPricingItemProps } from './LBPricingItem'

export type LBPricingProps = {
    pricing: Pricing
}

const allPlatforms: Platform[] = [ 'app-store', 'play-store' ]
const allConversionTypes: ConversionType[] = [ 'Install', 'Session', 'Event' ]

export function LBPricing ({ pricing: _pricing }: LBPricingProps) {
	const { spacing } = useLBTheme()

	let pricing = { ..._pricing }
	pricing.pricingType = getPricingTypeCode(pricing.pricingType) as PricingType

	const pricingItems: LBPricingItemProps[] = (() => {
		switch (pricing.pricingType){
		case 'Fixed':
			return [
				{
					platforms: allPlatforms.map(e => getPlatformIcon(e)),
					price: pricing.fixedPricing.price,
					others: false,
					currency: 'USD',
					conversionTypes: allConversionTypes.map(e => getConversionType(e as unknown as ConversionType))
				}
			]
		case 'PlatformBased':
				type PlaformBasedPricingItem = {
					price: number;
					platforms: Record<string, boolean>;
					conversionType: ConversionType;
					others: boolean;
				}
			const platformBasedPricings: Record<string, PlaformBasedPricingItem> = pricing.platformBasedPricing.reduce(
				(entryMap, e) =>
					({
						...entryMap,
						[`${e.platform}_${e.conversionType}_${e.price}`]: {
							price: e.price,
							platforms: {
								...(entryMap[`${e.price}`]?.platforms ?? {}),
								[e.platform]: true
							},
							conversionType: e.conversionType,
							others: false
						}
					}),
					{} as Record<string, PlaformBasedPricingItem>
			)

			return Object.values({
				...platformBasedPricings,
				'others': {
					platforms: allPlatforms.map(e => getPlatformIcon(e)),
					price: pricing.fixedPricing.price,
					others: true,
					conversionType: 'conversion'
				}
			}).map(pricing => {
				return {
					platforms: Object.keys(pricing.platforms)
						.map(e => getPlatformIcon(e)),
					price: pricing.price,
					others: pricing.others,
					currency: 'USD',
					conversionTypes: pricing.others ? [] : [ getConversionType(pricing.conversionType) ]
				}
			})
		case 'LocationBased':
				type LocationBasedPricingItem = {
					price: number;
					countries: Record<string, boolean>;
					conversionType: ConversionType;
					others: boolean;
				}
			const locationbasedPricings: Record<string, LocationBasedPricingItem> = pricing.locationBasedPricing.reduce(
				(entryMap, e) =>
					({
						...entryMap,
						[`${e.price}_${e.conversionType}`]: {
							price: e.price,
							countries: {
								...(entryMap[`${e.price}_${e.conversionType}`]?.countries ?? {}),
								[e.countryCode]: true
							},
							conversionType: e.conversionType,
							others: false
						}
					}),
					{} as Record<string, LocationBasedPricingItem>
			)

			return Object.values({
				...locationbasedPricings,
				'others': {
					platforms: [].map(e => getPlatformIcon(e)),
					countries: [],
					price: pricing.fixedPricing.price,
					others: true,
					conversionType: 'conversion'
				}
			}).map(pricing => {
				return {
					platforms: [].map(e => getPlatformIcon(e)),
					countries: Object.keys(pricing.countries)
						.map(e => getCountry(e)),
					price: pricing.price,
					others: pricing.others,
					currency: 'USD',
					conversionTypes: pricing.others ? [] : [ getConversionType(pricing.conversionType) ]
				}
			})
		case 'LocationAndPlatformBased':
				type LocationAndPlatformBasedPricingItem = {
					platforms: Record<string, boolean>;
					conversionType: ConversionType;
					countries: Record<string, boolean>;
					price: number;
					others: boolean;
				}
			const locationAndPlatformBasedPricings: Record<string, LocationAndPlatformBasedPricingItem> = pricing.locationAndPlatformBasedPricing.reduce(
				(entryMap, e) =>
					({
						...entryMap,
						[`${e.locationBasedPricing.price}_${e.platform}_${e.locationBasedPricing.conversionType}`]: {
							platforms: {
								...(entryMap[`${e.locationBasedPricing.price}_${e.platform}_${e.locationBasedPricing.conversionType}`]?.platforms ?? {}),
								[e.platform]: true
							},
							price: e.locationBasedPricing.price,
							countries: {
								[e.locationBasedPricing.countryCode]: true
							},
							conversionType: e.locationBasedPricing.conversionType,
							others: false
						}
					}),
					{} as Record<string, LocationAndPlatformBasedPricingItem>
			)

			return Object.values({
				...locationAndPlatformBasedPricings,
				'others': {
					platforms: [].map(e => getPlatformIcon(e)),
					countries: [],
					price: pricing.fixedPricing.price,
					others: true,
					conversionType: 'Conversion'
				}
			}).map(pricing => {
				return {
					platforms: Object.keys(pricing.platforms)
						.map(e => getPlatformIcon(e)),
					countries: Object.keys(pricing.countries)
						.map(e => getCountry(e)),
					price: pricing.price,
					others: pricing.others,
					currency: 'USD',
					conversionTypes: pricing.others ? [] : [ getConversionType(pricing.conversionType) ]
				}
			})
		default:
			return []
		}
	})()

	return <>
		{pricingItems.map((pricing, index) => {
			return <LBView key={`pricing_item_${index}`} style={{
				paddingVertical: spacing(4),
				width: '100%'
			}}>
				<LBPricingItem
					platforms={pricing.platforms}
					countries={pricing.countries}
					price={pricing.price}
					others={pricing.others}
					currency={pricing.currency}
					conversionTypes={pricing.conversionTypes}
				/>
			</LBView>
		})}
	</>
}
