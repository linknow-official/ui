import { useAdvertiserContext } from 'unicpeak/app/(advertiser)/context'
import { useAdvertiserCreateCampaignContext } from 'unicpeak/app/(advertiser)/create-campaign/context'
import { useLBTheme } from 'unicpeak/hooks/useLBTheme'
import { LBButton } from 'unicpeak/primitives/LBButton'
import { LBLogo } from 'unicpeak/primitives/LBLogo'
import { LBView } from 'unicpeak/primitives/LBView'
import { router } from 'expo-router'

export function LBCreateCampaignHeader () {
	const { spacing, color } = useLBTheme()

	const { activeStep } = useAdvertiserCreateCampaignContext()
	const { campaigns } = useAdvertiserContext()

	const onBackPress = () => {
		if (activeStep == 1){
			router.dismissAll()
			router.back()
			return
		}

		if (activeStep)
			router.push(`/(advertiser)/create-campaign/step-${activeStep - 1}`)
	}

	return <LBView direction="vertical" style={{
		padding: spacing(4),
		backgroundColor: color('background')
	}}>
		<LBView direction="horizontal" style={{
			justifyContent: 'space-between'
		}}>
			<LBLogo size="medium" />
			{
				campaigns?.length != 0 ?
					<LBButton variant="ghost" onPress={onBackPress}>
                    Back
					</LBButton>
					: <></>
			}
		</LBView>
	</LBView>
}
