import { getPlatformIcon } from 'unicpeak/helpers/left-byte'
import { formatMoney } from 'unicpeak/helpers/money'
import { useLBTheme } from 'unicpeak/hooks/useLBTheme'
import { LBIcon } from 'unicpeak/primitives/LBIcon'
import { LBText } from 'unicpeak/primitives/LBText'
import { LBView } from 'unicpeak/primitives/LBView'
import { Icon } from 'unicpeak/theme/useIcon'
import React from 'react'

export type LBPricingItemProps = {
    platforms?: Icon[],
    countries?: string[],
    others?: boolean;
    price: number,
    currency: string,
    conversionTypes: ('Conversion'|'Install'|'Event'|'Reattribution'|'Rejected'|'Session')[]

}
export function LBPricingItem ({ platforms, countries, others, price, currency, conversionTypes }: LBPricingItemProps) {
	const { color, spacing } = useLBTheme()

	return <LBView direction='horizontal' style={{
		justifyContent: 'space-between'
	}}>
		<LBView
			style={{
				flex: 5,
				paddingRight: spacing(4)
			}}
			renderItemKey={(index) => `pricing_type_${index}`}
			renderItemStyle={{
				style: {
					marginBottom: spacing(1)
				}
			}}
		>
			{
				(!(others) && !!platforms && (platforms?.length > 0)) && <LBView direction='horizontal' style={{
					alignItems: 'center'
				}}>
					<LBText variant='detail' color={color('slate.900')}>{platforms.length > 1 ? 'Platforms' : 'Platform'}:</LBText>
					<LBView style={{
						width: spacing(1)
					}} />
					{platforms.map((platform, index) =>
						<LBView key={`lb_platform_${countries}_${conversionTypes}_${index}`} style={{
							marginRight: spacing(1)
						}}>
							<LBIcon icon={getPlatformIcon(platform)} />
						</LBView>
					)}
				</LBView>
			}
			<LBView direction='horizontal' style={{
			}}>
				<LBView style={{
					flexWrap: 'nowrap'
				}}>
					{
						!!countries && !others &&
                        <LBText variant='table-item'>
                        	<LBText variant='table-head' style={{ marginRight: spacing(1) }}>
                        		{countries?.length > 1 ? 'Countries' : 'Country'}: </LBText>
                        	<LBText style={{ flex: 1 }} variant='detail'>
                        		{countries?.join(',')}
                        	</LBText>
                        </LBText>
					}
					{others && <LBText variant='table-head'>Others</LBText>}
				</LBView>
			</LBView>
		</LBView>
		<LBView
			direction='vertical' style={{
				alignItems: 'flex-end'
			}}
		>
			<LBView
				direction='vertical'
				style={{
					alignItems: 'flex-start'
				}}
				renderItemKey={(index) => `pricing_item_price_${index}`}
				renderItemStyle={{
					style: {
						marginBottom: spacing(1)
					}
				}}
			>
				<LBView direction='horizontal'>
					<LBText variant='table-head'>
                        Price: <LBText variant='table-item' fontWeight="bold" color={color('slate.600')}>
							{formatMoney(price)} {currency}
						</LBText>
					</LBText>
				</LBView>
				<LBView
					direction='vertical'
					renderItemKey={(index) => `pricing_item_conversion_type_${countries}_${conversionTypes}_${index}`}
					renderItemStyle={{
						style: {
							marginBottom: spacing(0.1)
						}
					}}
				>
					{conversionTypes.map((conversionType, index) => <LBText key={`lb_conversion_${countries}_${conversionTypes}_${index}`} variant='small' color={color('slate.400')}>per {conversionType}</LBText>)}
				</LBView>

			</LBView>
		</LBView>
	</LBView>
}
