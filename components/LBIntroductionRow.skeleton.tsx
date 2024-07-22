
import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { MotiView } from 'moti'
import React from 'react'
import { LBView } from 'unicpeak-ui/primitives/LBView'
import { Skeleton } from 'moti/skeleton'

export const LBIntroductionRowSkeleton = () => {
	const { spacing, color } = useLBTheme()

	return (
		<MotiView
			transition={{
				type: 'timing'
           
			}}
			style={{
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}
		>
			<LBView direction='horizontal' >
				<LBView direction='horizontal' style={{
					justifyContent: 'flex-start',
					width: '100%'
				}}>
					<Skeleton radius="round" colors={[ color('slate.300'), color('slate.400') ]} height={75} width={75} />
					<LBView style={{ width: spacing(2) }}/>
					<LBView style={{
						justifyContent: 'center'
					}}>
						<Skeleton colors={[ color('slate.300'), color('slate.400') ]} width={100} height={20} />
						<LBView style={{ height: spacing(4) }}/>
						<Skeleton colors={[ color('slate.300'), color('slate.400') ]} width={150} height={20} />
					</LBView>
				</LBView>
			</LBView>
		</MotiView>
	)
}
