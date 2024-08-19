import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { LBIcon } from 'unicpeak-ui/primitives/LBIcon'
import { LBText } from 'unicpeak-ui/primitives/LBText'
import { LBView } from 'unicpeak-ui/primitives/LBView'
import { Icon } from 'unicpeak-ui/theme/useIcon'
import { Dimensions } from 'react-native'

type LBModalProps = {
    title?: string;
    subTitle?: string;
    icon?: Icon;
    children: React.ReactNode;
    actions?: React.ReactNode;
}

export function LBModal ({ title, subTitle, icon, actions, children }: Readonly<LBModalProps>) {
	const { spacing, color } = useLBTheme()

	return (
		<LBView
			style={{
				borderWidth: spacing(0.25),
				paddingVertical: spacing(4),
				paddingHorizontal: spacing(6),
				borderColor: color('slate.300'),
				borderRadius: spacing(3),
				backgroundColor: color('white'),
				width: Dimensions.get('screen').width * 0.75,
				height: 'auto'
			}}
		>
			<LBView direction='horizontal' center style={{
				marginBottom: spacing(2),
				justifyContent: 'space-between'
			}}>
				{
					!!title && <LBView center>
						<LBText variant='large' fontWeight='bold'>{title} </LBText>
					</LBView>
				}
				{
					!!subTitle &&
					<LBView style={{ flex: 1 }} center>
						<LBText variant='subtle' fontWeight='bold' style={{ fontSize: spacing(3) }}>{subTitle} </LBText>
					</LBView>
				}
				{icon && <LBIcon icon={icon} fill={color('white')} />}
				{actions}
			</LBView >
			{children}
		</LBView>
	)
}
