import { Campaign } from 'unicpeak/helpers/left-byte'
import { useLBTheme } from 'unicpeak/hooks/useLBTheme'
import { LBIcon } from 'unicpeak/primitives/LBIcon'
import { LBText } from 'unicpeak/primitives/LBText'
import { LBView } from 'unicpeak/primitives/LBView'
import React from 'react'
import { Image } from 'react-native'

type CampaignDetailsProps = {
    campaign: Campaign;
    statusComponent?: React.ReactNode;
}

export function LBCampaignDetails ({ campaign, statusComponent }: CampaignDetailsProps) {
	const { spacing, color } = useLBTheme()

	return <LBView
		style={{
			flex: 1
		}}>
		<LBView style={{
			position: 'relative',
			width: '100%',
			height: 350,
			borderRadius: spacing(2),
			overflow: 'hidden'
		}}>
			<Image
				source={{ uri: campaign.application.appImage }}
				style={{
					width: '100%',
					height: '100%'
				}}
				resizeMode="cover"
			/>
			{statusComponent}
		</LBView>
		<LBView style={{ paddingTop: spacing(4), paddingHorizontal: spacing(4) }}>
			<LBView direction='horizontal' style={{
				flex: 1,
				justifyContent: 'space-between',
				alignItems: 'center'
			}}>
				<LBText variant='h2'>
					Details
				</LBText>
				<LBIcon icon='chevrons-down-up' size='medium' />
			</LBView>
		</LBView>
		<LBView style={{ paddingVertical: spacing(2), paddingHorizontal: spacing(4) }}>
			<LBText color={color('slate.400')}>
				{campaign?.description}
			</LBText>
		</LBView>
	</LBView>
}
