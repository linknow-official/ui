import { Icon } from 'unicpeak/theme/useIcon'

export type CampaignStatus = 'Active' | 'Paused' | 'Finished' | 'Requested';
export type TrackerPlatform = 'Adjust' | 'Appsflyer';
export type CountryCode = 'TR' | 'USA' | 'FR'
export type ConversionType = 'Conversion' | 'Install' | 'Event' | 'Reattribution' | 'Rejected' | 'Session';
export type Platform = 'app-store' | 'play-store';
export type PricingType = 'Fixed' | 'LocationBased' | 'PlatformBased' | 'LocationAndPlatformBased';
export type PlaformName = 'iOS' | 'Android'

export type FixedPricing = {
    price: number;
};
export type PlatformBasedPricing = {
    platform: PlaformName;
    price: number;
    conversionType: ConversionType;
};
export type LocationBasedPricing = {
    conversionType: ConversionType;
    price: number;
    countryCode: CountryCode;
};
export type LocationAndPlatformBasedPricing = {
    platform: PlaformName;
    locationBasedPricing: LocationBasedPricing;
};

export type Pricing = {
    pricingType: 'Fixed';
    fixedPricing: FixedPricing;
} |
{
    pricingType: 'LocationBased';
    fixedPricing: FixedPricing;
    locationBasedPricing: LocationBasedPricing[];
} |
{
    pricingType: 'PlatformBased';
    fixedPricing: FixedPricing;
    platformBasedPricing: PlatformBasedPricing[];
} |
{
    pricingType: 'LocationAndPlatformBased';
    fixedPricing: FixedPricing;
    locationAndPlatformBasedPricing: LocationAndPlatformBasedPricing[];
}

export type PublishingRequestStatus = 'Pending' | 'Approved' | 'Rejected'

export type Campaign = {
    id: string;
    name: string;
    description: string;
    status: CampaignStatus;
    advertiserId: string;
    trackerPlatform: TrackerPlatform;
    application:
    {
        appName: string;
        appImage: string;
        shortLink: string;
        appStoreLink?: string;
        playStoreLink?: string;
    },
    attributes?: CampaignAttribute[];
    pricing: Pricing
};

export type CampaignAttribute = {
    title: string;
}

export type CampaignPricing = {
    platforms?: Icon[],
    countries?: string[],
    others?: boolean;
    price: number,
    currency: string,
    conversionTypes: ('Install' | 'Session')[]
}


export const getPlatformIcon = (platform: string | Platform) => {
	if (platform.toString() == '0') return 'app-store'
	if (platform.toString() == '1') return 'play-store'
	if (platform.toString() == 'iOS') return 'app-store'
	if (platform.toString() == 'Android') return 'play-store'

	return platform as Icon
}

export const getPlatformName = (platform: string | Platform) => {
	if (platform.toString() == 'app-store') return 'iOS'
	if (platform.toString() == 'play-store') return 'Android'

	return platform as PlaformName
}

export const getCountry = (country: string | CountryCode) => {
	if (country.toString() == 'TR') return 'Türkiye'
	if (country.toString() == 'FR') return 'France'
	if (country.toString() == 'USA') return 'United States Of America'

	return country
}

export const getConversionType = (conversionType: string | ConversionType) => {
	if (conversionType.toString() == '0') return 'Conversion'
	if (conversionType.toString() == '1') return 'Install'
	if (conversionType.toString() == '2') return 'Event'
	if (conversionType.toString() == '3') return 'Reattribution'
	if (conversionType.toString() == '4') return 'Rejected'
	if (conversionType.toString() == '5') return 'Session'
	return conversionType as ConversionType
}

export const getTrackingPlatform = (trackingPlatform: string | TrackerPlatform) => {
	if (trackingPlatform.toString() == '0') return 'Adjust'
	if (trackingPlatform.toString() == '1') return 'Appsflyer'
	return trackingPlatform
}

export const getPricingType = (pricingType: string | PricingType) => {
	if (pricingType.toString() == '0') return 'Fixed'
	if (pricingType.toString() == '1') return 'Location Based'
	if (pricingType.toString() == '2') return 'Platform Based'
	if (pricingType.toString() == '3') return 'Location and Platform Based'

	if (pricingType.toString() == 'Fixed') return 'Fixed'
	if (pricingType.toString() == 'LocationBased') return 'Location Based'
	if (pricingType.toString() == 'PlatformBased') return 'Platform Based'
	if (pricingType.toString() == 'LocationAndPlatformBased') return 'Location and Platform Based'
	return pricingType
}

export const getPricingTypeCode = (pricingType: string | PricingType) => {
	if (pricingType.toString() == '0') return 'Fixed'
	if (pricingType.toString() == '1') return 'LocationBased'
	if (pricingType.toString() == '2') return 'PlatformBased'
	if (pricingType.toString() == '3') return 'LocationAndPlatformBased'
	return pricingType as PricingType
}

export const getCampaignStatus = (conversionType: string | CampaignStatus) => {
	if (conversionType.toString() == '0') return 'Active'
	if (conversionType.toString() == '1') return 'Paused'
	if (conversionType.toString() == '2') return 'Finished'
	if (conversionType.toString() == '3') return 'Requested'
	return conversionType
}

export const getUserType = (userType: number) => {
	if (userType.toString() == '0') return 'advertiser'
	if (userType.toString() == '1') return 'publisher'
	return userType
}
