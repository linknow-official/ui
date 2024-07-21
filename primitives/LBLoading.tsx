import { useThemeColor } from 'unicpeak/hooks/useThemeColor'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { LBView } from './LBView'

export type LBLoadingProps = {
    color: ReturnType<typeof useThemeColor>
}

export function LBLoading (props: LBLoadingProps) {
	const { color } = props

	return <LBView style={[
		{
			justifyContent: 'center',
			alignItems: 'center'
		}
	]}>
		<ActivityIndicator size="small" color={color} />
	</LBView>
}
