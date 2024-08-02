import { Text as DefaultText, Platform, StyleProp, TextStyle } from 'react-native'

import { useThemeColor } from 'unicpeak-ui/hooks/useThemeColor'
import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { ThemeProps } from './ThemeProps'
import { TypographyTheme, TypographyVariant, TypographyWeight, useTypography } from 'unicpeak-ui/theme/useTypography'
import { ExtendedStyleProp, useMediaQuery } from 'unicpeak-ui/hooks/useMediaQuery'

export type LBTextProps = ThemeProps & DefaultText['props'] & {
    color?: ReturnType<typeof useThemeColor>,
    underlineColor?: ReturnType<typeof useThemeColor>,
    underlineWidth?: number,
    center?: boolean,
    variant?: TypographyVariant,
    override?: Partial<TypographyTheme>,
    fontWeight?: TypographyWeight;
    style?: ExtendedStyleProp<TextStyle>;
};

export function LBText (props: LBTextProps) {
	const { style: _style, fontWeight, variant, override, underlineColor, underlineWidth, center, ...otherProps } = props
	const { spacing } = useLBTheme()
	const typograpgyTheme = useTypography(variant ?? 'p', override)
	const textStyles: StyleProp<TextStyle>[] = [
		{
			color: props.color || typograpgyTheme.color,
			fontSize: typograpgyTheme.fontSize,
			letterSpacing: typograpgyTheme.letterSpacing,
			...([ 'ios', 'web' ].includes(Platform.OS) ? { lineHeight: typograpgyTheme.lineHeight as number } : { lineSpacing: typograpgyTheme.lineSpacing as number }),
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

	const style = useMediaQuery([
		...textStyles,
		_style
	])

	if ([ 'ios', 'android' ].includes(Platform.OS))
		return <DefaultText {...style} {...otherProps} />

	if (variant == 'h1')
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return <h1 {...style as any} {...otherProps} />
	if (variant == 'h2')
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return <h2 {...style as any} {...otherProps} />
	if (variant == 'h3')
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return <h3 {...style as any} {...otherProps} />
	if (variant == 'h4')
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return <h4 {...style as any} {...otherProps} />

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return <span {...style as any} {...otherProps} />
}
