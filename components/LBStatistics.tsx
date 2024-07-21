import { useLBTheme } from 'unicpeak/hooks/useLBTheme'
import { LBView } from 'unicpeak/primitives/LBView'
import { Icon } from 'unicpeak/theme/useIcon'
import React from 'react'
import { LBAttribution } from './LBAttribution'

const generateUniqueId = (() => {
	let counter = 0
	return () => `custom-id-${counter++}`
})()

export interface Attribution {
  title: string;
  icon: Icon;
  type?: 'normal' | 'money';
  count: number;
}

export interface LBStatisticsProps {
  attributions: Attribution[];
}

export const LBStatistics = ({ attributions }: LBStatisticsProps) => {
	const { spacing } = useLBTheme()
	const totalAttributionCount = attributions.reduce((total, attribution) => total + attribution.count, 0)

	const chunkAttributions = (array: Attribution[], size: number) => {
		const result = []
		for (let i = 0; i < array.length; i += size){
			result.push(array.slice(i, i + size))
		}
		return result
	}

	const attributionPairs = chunkAttributions(attributions, 2)

	return (
		<>
			{attributionPairs.map((pair, index) => (
				<LBView key={`${generateUniqueId()}_${index}`} direction="horizontal" style={{ flex: 1, marginBottom: spacing(2) }}>
					{pair.map((attribution, subIndex) => (
						<React.Fragment key={`${generateUniqueId()}${subIndex}`}>
							<LBAttribution
								key={`${generateUniqueId()}_atttribution_${subIndex}`}
								title={attribution.title}
								icon={attribution.icon}
								type={attribution.type}
								attributionCount={attribution.count}
								totalAttribution={totalAttributionCount}
							/>
							{subIndex != pair.length && <LBView key={`${generateUniqueId()}_divider_${subIndex}`} style={{ width: spacing(2) }} />}
						</React.Fragment>
					))}
				</LBView>
			))}
		</>
	)
}
