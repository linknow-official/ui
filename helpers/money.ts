import { Platform } from 'react-native'

export const formatMoney = (price: number) => {
	return ((price || 0) / 100).toFixed(2)
}

export const isPriceValid = (price: string | undefined, minValue?: number): boolean => {
	const parsedPrice = parseFloat(Platform.OS == 'ios' ? price?.replaceAll(',', '.') || '' : price || '')
	return !isNaN(parsedPrice) && parsedPrice >= (minValue || 0.0)
}
