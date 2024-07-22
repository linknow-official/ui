import { Text as DefaultText, Platform, TextStyle } from 'react-native'

import { useThemeColor } from 'unicpeak-ui/hooks/useThemeColor'
import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { ThemeProps } from './ThemeProps'
import { TypographyTheme, TypographyVariant, TypographyWeight, useTypography } from 'unicpeak-ui/theme/useTypography'

export type LBTextProps = ThemeProps & DefaultText['props'] & {
  color?: ReturnType<typeof useThemeColor>,
  underlineColor?: ReturnType<typeof useThemeColor>,
  underlineWidth?: number,
  center?: boolean,
  variant?: TypographyVariant,
  override?: Partial<TypographyTheme>,
  fontWeight?: TypographyWeight
};

export function LBText (props: LBTextProps) {
	const { style, fontWeight, variant, override, underlineColor, underlineWidth, center, ...otherProps } = props
	const { spacing } = useLBTheme()
	const typograpgyTheme = useTypography(variant ?? 'p', override)
	const textStyles: TextStyle[] = [
		{
			color: props.color || typograpgyTheme.color,
			fontSize: typograpgyTheme.fontSize,
			letterSpacing: typograpgyTheme.letterSpacing,
			...(Platform.OS == 'ios' ? { lineHeight: typograpgyTheme.lineSpacing } : {}),
			fontFamily: fontWeight || typograpgyTheme.fontWeight,
			borderBottomWidth: underlineWidth ? spacing(underlineWidth) : spacing(0)
		}
	]

	if (underlineWidth && underlineColor){
		textStyles.push({
			textDecorationLine: 'underline',
			textDecorationColor: underlineColor
		})
	}

	if (center){
		textStyles.push({ textAlign: 'center' })
	}

	return <DefaultText style={[ ...textStyles, style ]} {...otherProps} />
}
