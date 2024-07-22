import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { useThemeColor } from 'unicpeak-ui/hooks/useThemeColor'
import { LBIcon, LBIconProps } from 'unicpeak-ui/primitives/LBIcon'
import { LBText } from 'unicpeak-ui/primitives/LBText'
import { LBView, LBViewProps } from 'unicpeak-ui/primitives/LBView'
import { Icon } from 'unicpeak-ui/theme/useIcon'

export type LBMessageWrapperProps = {
    containerStyle?: Partial<LBViewProps['style']>
    children?: React.ReactNode;
    message?: string;
    icon?: Icon;
    iconProps?: Partial<LBIconProps>
    color?: ReturnType<typeof useThemeColor>
}
export const LBMessageWrapper = ({ children, containerStyle, message, icon, iconProps, color: wrapperColor }: LBMessageWrapperProps) => {
	const { spacing, color } = useLBTheme()

	return <LBView
		style={{
			backgroundColor: wrapperColor || color('wrapperBackground'),
			borderRadius: spacing(2.5),
			...containerStyle
		}}
		flatList
		renderItemStyle={{
			style: {
				padding: spacing(2.5)
			}
		}}
		renderItemKey={(index) => `message_wrapper_${message}_${index}`}
	>
		{
			icon &&
            <LBView center>
            	<LBIcon icon={icon} size="large" {...iconProps} />
            </LBView>
		}
		{message && <LBText style={{ marginTop: -spacing(2.5) }} variant="body">{message}</LBText>}
		{children}
	</LBView>
}
