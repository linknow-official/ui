import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { ButtonTheme, ButtonVariant, useButton } from 'unicpeak-ui/theme/useButton'
import { useIcon } from 'unicpeak-ui/theme/useIcon'
import React from 'react'
import { Pressable, TouchableOpacityProps, ViewStyle } from 'react-native'
import { LBIcon } from './LBIcon'
import { LBLoading } from './LBLoading'
import { LBText } from './LBText'
import { LBView } from './LBView'
import { ThemeProps } from './ThemeProps'
import { ExtendedStyleProp, generateMediaQuery, useWidth } from 'unicpeak-ui/hooks/useMediaQuery'

export type BaseLBButtonProps = ThemeProps & TouchableOpacityProps & {
    variant?: ButtonVariant,
    loading?: boolean,
    override?: Partial<ButtonTheme>
    style?: ExtendedStyleProp<ViewStyle>;
}
export type LBIconButtonProps = BaseLBButtonProps & {
    variant: 'just-icon' | 'just-icon-circle';
    icon: Parameters<typeof useIcon>[0]
    fullWidth?: boolean;
};

export type LBButtonProps = BaseLBButtonProps & {
  variant: Exclude<ButtonVariant, 'just-icon' | 'just-icon-circle'>
    fullWidth?: boolean;
    icon?: Parameters<typeof useIcon>[0]
}

export function LBButton (props: LBIconButtonProps | LBButtonProps) {
	const { variant, style: _style, children, loading, icon, override, ...rest } = props
	const buttonTheme = useButton(variant, override)
	const { spacing, color } = useLBTheme()
	const { width } = useWidth()

	const { style } = { style: generateMediaQuery([
		{
			flexDirection: 'row',
			backgroundColor: buttonTheme.background,
			borderColor: buttonTheme.borderColor,
			borderRadius: spacing(buttonTheme.borderRadius),
			borderWidth: buttonTheme.borderWidth,
			paddingHorizontal: spacing(buttonTheme.paddingHorizontal),
			paddingVertical: spacing(buttonTheme.paddingVertical),
			width: props.fullWidth ? '100%' : 'auto',
			justifyContent: 'center',
			alignItems: 'center'
		},
		(rest.disabled) && {
			backgroundColor: buttonTheme.disabledBackground,
			borderColor: buttonTheme.disabledBorderColor,
			borderRadius: spacing(buttonTheme.disabledBorderRadius),
			borderWidth: buttonTheme.disabledBorderWidth
		},
		...(buttonTheme.minHeight ? [ {
			minHeight: buttonTheme.minHeight
		} ] : []),
		...(buttonTheme.minWidth ? [ {
			minWidth: buttonTheme.minWidth
		} ] : []),
		...(buttonTheme.maxWidth ? [ {
			minWidth: buttonTheme.maxWidth
		} ] : []),
		...(buttonTheme.maxHeight ? [ {
			minWidth: buttonTheme.maxHeight
		} ] : []),
		_style
	], width).styles } as { style: ViewStyle }

	return (
		<Pressable
			style={({ pressed }) => [
				style,
				(pressed || loading) && {
					backgroundColor: buttonTheme.backgroundHover,
					borderColor: buttonTheme.borderColorHover
				}
			] }
			{...rest}
			disabled={rest.disabled || loading}
		>
			{({ pressed }) => <>
				{loading && <LBLoading color={buttonTheme['text']['color'] ?? color('black')} />}
				{loading && <LBView style={{ marginLeft: spacing(buttonTheme.paddingHorizontal) }} />}
				{icon && <LBIcon icon={icon} fill='#FFF' {...buttonTheme.icon} />}
				{icon && !variant.startsWith('just-icon') && <LBView style={{ marginLeft: spacing(buttonTheme.paddingHorizontal) }} />}
				{
					!!children &&
					<LBView style={{
						...(icon ? { marginLeft: spacing(2) } : {})
					}}>
						<LBText {...buttonTheme.text} underlineColor={pressed ? buttonTheme.text.underlineColor : undefined} center>
							{children}
						</LBText>
					</LBView>
				}
			</>}
		</Pressable>
	)
}
