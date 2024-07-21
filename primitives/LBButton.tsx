import { useLBTheme } from 'unicpeak/hooks/useLBTheme'
import { ButtonTheme, ButtonVariant, useButton } from 'unicpeak/theme/useButton'
import { useIcon } from 'unicpeak/theme/useIcon'
import React from 'react'
import { Pressable, TouchableOpacity, ViewStyle } from 'react-native'
import { LBIcon } from './LBIcon'
import { LBLoading } from './LBLoading'
import { LBText } from './LBText'
import { LBView } from './LBView'
import { ThemeProps } from './ThemeProps'

export type BaseLBButtonProps = ThemeProps & TouchableOpacity['props'] & {
    variant?: ButtonVariant,
    loading?: boolean,
    override?: Partial<ButtonTheme>
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
	const { variant, style, children, loading, icon, override, ...rest } = props
	const buttonTheme = useButton(variant, override)
	const { spacing, color } = useLBTheme()

	return (
		<Pressable
			style={({ pressed }) => [
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
				(pressed || loading) && {
					backgroundColor: buttonTheme.backgroundHover,
					borderColor: buttonTheme.borderColorHover
				},
				(rest.disabled) && {
					backgroundColor: buttonTheme.disabledBackground,
					borderColor: buttonTheme.disabledBorderColor,
					borderRadius: spacing(buttonTheme.disabledBorderRadius),
					borderWidth: buttonTheme.disabledBorderWidth
				},
				(buttonTheme.minHeight) && {
					minHeight: buttonTheme.minHeight
				},
				(buttonTheme.minWidth) && {
					minWidth: buttonTheme.minWidth
				},
				(buttonTheme.maxWidth) && {
					minWidth: buttonTheme.maxWidth
				},
				(buttonTheme.maxHeight) && {
					minWidth: buttonTheme.maxHeight
				},
				style
			] as ViewStyle[]}
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
