
import { useLBTheme } from 'unicpeak/hooks/useLBTheme'
import React from 'react'
import { LBView } from 'unicpeak/primitives/LBView'
import { LBIntroductionRowSkeleton } from './LBIntroductionRow.skeleton'

export const LBIntroductionBoxSkeleton = () => {
	const { spacing, color } = useLBTheme()

	return (
		<LBView style={{
			backgroundColor: color('slate.100'),
			borderRadius: spacing(2),
			shadowOffset: {
				width: 0,
				height: 1
			},
			shadowOpacity: spacing(0.05),
			shadowRadius: spacing(0.25),

			elevation: spacing(1),
			position: 'relative',
			width: '100%',
			height: 157,
			overflow: 'hidden'
		}}>
           
			<LBView style={{
				position: 'absolute',
				alignSelf: 'center',
				width: '100%',
				padding: spacing(4),
				bottom: 0
			}}>
				<LBIntroductionRowSkeleton />
			</LBView>
		</LBView>
	)
}
