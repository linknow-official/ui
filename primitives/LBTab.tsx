import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { useThemeColor } from 'unicpeak-ui/hooks/useThemeColor'
import React from 'react'
import { LBButton } from './LBButton'
import { LBText } from './LBText'
import { LBView } from './LBView'
import { ThemeProps } from './ThemeProps'

export type LBTabProps = ThemeProps & {
	tabs: string[];
	activeTab?: string;
	onTabPress: (tab: string) => void;
	type?: 'default' | 'text';
};

export function LBTab (props: LBTabProps) {
	const { tabs, activeTab, onTabPress, type } = props
	const tabBackgroundColor = useThemeColor('tabBackground')
	const tabSelectedBackgroundColor = useThemeColor('tabSelectedBackground')
	const tabUnselectedTextColor = useThemeColor('tabUnselectedText')
	const tabSelectedTextColor = useThemeColor('tabSelectedText')

	const { spacing, color } = useLBTheme()

	if (type == 'text'){
		return (
			<LBView style={{
				flex: 1,
				flexDirection: 'row',
				padding: spacing(1.2),
				borderRadius: spacing(1.5)
			}}>
				{tabs.map((tab) => (
					<LBView key={tab} style={{
						marginRight: spacing(2)
					}} >
						<LBText
							variant="h3"
							color={color('slate.900')}
							onPress={() => onTabPress(tab)}
						>
							{tab}
						</LBText>
						<LBView style={{
							height: 3,
							width: '100%',
							...(activeTab === tab && {
								backgroundColor: color('slate.900')
							}),
							...(activeTab !== tab && {
								backgroundColor: 'transparent'
							})
						}} />
					</LBView>
				))}
			</LBView>
		)
	}

	return (
		<LBView style={{
			flex: 1,
			flexDirection: 'row',
			backgroundColor: tabBackgroundColor,
			padding: spacing(1.2),
			borderRadius: spacing(1.5)
		}}>
			{tabs.map((tab) => (
				<LBButton
					key={tab}
					variant="tab"
					override={{
						...(activeTab === tab && {
							background: tabSelectedBackgroundColor,
							text: {
								variant: 'subtle',
								color: tabSelectedTextColor
							}
						}),
						...(activeTab !== tab && {
							text: {
								variant: 'subtle',
								color: tabUnselectedTextColor
							}
						})
					}}
					onPress={() => onTabPress(tab)}
				>
					{tab}
				</LBButton>
			))}
		</LBView>
	)
}
