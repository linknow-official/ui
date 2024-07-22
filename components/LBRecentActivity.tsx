import React from 'react'
import { LBView } from 'unicpeak-ui/primitives/LBView'
import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { Icon } from 'unicpeak-ui/theme/useIcon'
import { formatMoney } from 'unicpeak-ui/helpers/money'
import { LBIcon } from 'unicpeak-ui/primitives/LBIcon'
import { LBText } from 'unicpeak-ui/primitives/LBText'
import { formatDateTime } from 'unicpeak-ui/helpers/time'
import { Image } from 'react-native'

export type LBRecentActivityProps = {
	publisher?: {
		id: string,
		username: string,
		fullName: string,
		createdAt: number
		photo?: string
	},
	createdAt: number,
	platform?: Icon,
	country: string,
	estimatedPayout: number,
	currency: string,
	conversionType: 'Conversion' | 'Install' | 'Event' | 'Reattribution' | 'Rejected' | 'Session'

}
export function LBRecentActivity ({ publisher, createdAt, platform, country, estimatedPayout, currency }: LBRecentActivityProps) {
	const { color, spacing } = useLBTheme()

	return <LBView direction='horizontal' style={{
		justifyContent: 'space-between'
	}}>
		<LBView style={{
			flex: 5,
			paddingRight: spacing(4)
		}}>
			{
				publisher &&
				<LBView direction='horizontal' style={{
				}}>
					<LBView direction='horizontal' style={{
						justifyContent: 'space-between',
						alignItems: 'center'
					}}>
						<LBView direction='horizontal' center>
							<Image source={publisher.photo ? { uri: publisher.photo } : require('unicpeak-ui/assets/images/default-avatar.jpeg')} style={{
								width: 40,
								height: 40,
								overflow: 'hidden',
								borderRadius: spacing(1.6),
								marginRight: spacing(2)
							}} resizeMode="contain" />
							<LBView style={{
								justifyContent: 'center'
							}}>
								<LBText variant='small' color={color('slate.900')}>{publisher.fullName}</LBText>
								<LBText variant='detail' color={color('slate.500')}>{publisher.username}</LBText>
							</LBView>
						</LBView>
					</LBView>
				</LBView>
			}
			<LBView style={{ paddingBottom: 8 }}>
				<LBView direction='horizontal' style={{ alignItems: 'center' }}>
					<LBView style={{ flex: 1 }}>
						<LBText variant='table-item'>
							<LBText variant='table-head' style={{ marginRight: spacing(1) }}>
				Country:
							</LBText>
							<LBText style={{ flex: 1 }} variant='detail'>
								{country}
							</LBText>

						</LBText>

						{platform && (
							<LBView style={{ flexDirection: 'row', alignItems: 'center' }}>
								<LBText variant='small' color={color('slate.900')}>
					Platform:
								</LBText>

								<LBView style={{ marginLeft: spacing(1) }}>
									<LBIcon icon={platform} />
								</LBView>

							</LBView>
						)}
					</LBView>
				</LBView>
			</LBView>

		</LBView>
		<LBView direction='vertical' style={{
			alignItems: 'flex-end'
		}}>
			<LBView direction='vertical' style={{
				alignItems: 'flex-start'
			}}>
				<LBView direction='horizontal' style={{
					alignItems: 'center'
				}}>
					<LBText color={color('slate.900')}>
						Estimated:

					</LBText>
					<LBText variant='table-item' fontWeight="bold" color={color('slate.600')}>
						{formatMoney(estimatedPayout)} {currency}
					</LBText>
				</LBView>
				<LBView direction='vertical'>
					<LBText variant='detail' color={color('slate.900')}>{formatDateTime(createdAt)}</LBText>
				</LBView>
				<LBView direction='vertical'>
					<LBText variant='small' color={color('slate.400')}>install</LBText>
				</LBView>

			</LBView>
		</LBView>
	</LBView>
}
