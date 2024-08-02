import { Platform } from 'react-native'
import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { useThemeColor } from 'unicpeak-ui/hooks/useThemeColor'

export type TypographyVariant =
'h1' |
'h2' |
'h3' |
'h4' |
'p' |
'body' |
'table-head' |
'table-item' |
'list' |
'lead' |
'large' |
'detail' |
'small' |
'subtle'

export type TypographyWeight =
'thin' |
'extra-light' |
'light' |
'regular' |
'medium' |
'semi-bold' |
'bold' |
'extra-bold'

export type TypographyTheme = {
    fontSize?: number,
    lineSpacing: number | `${number}px`,
    lineHeight: number | `${number}px`,
    color: ReturnType<typeof useThemeColor>,
    letterSpacing: number,
    fontWeight: TypographyWeight
}

export type UseTypography = Record<TypographyVariant, TypographyTheme>

export function useTypography (variant: TypographyVariant, override?: Partial<TypographyTheme>) {
	const { color, spacing } = useLBTheme()

	const typographyTheme: UseTypography = {
		h1: {
			fontSize: spacing(12),
			lineSpacing: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(12) : `${spacing(12)}px`,
			lineHeight: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(12) : '0px',
			color: color('text'),
			letterSpacing: spacing(-0.012),
			fontWeight: 'extra-bold'
		},
		h2: {
			fontSize: spacing(30 / 5),
			lineSpacing: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(9) : `${spacing(9)}px`,
			lineHeight: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(9) : '0px',
			color: color('text'),
			letterSpacing: spacing(-0.075),
			fontWeight: 'semi-bold'
		},
		h3: {
			fontSize: spacing(6),
			lineSpacing: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(8) : `${spacing(8)}px`,
			lineHeight: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(8) : '0px',
			color: color('text'),
			letterSpacing: spacing(-0.06),
			fontWeight: 'semi-bold'
		},
		h4: {
			fontSize: spacing(5),
			lineSpacing: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(7) : `${spacing(7)}px`,
			lineHeight: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(7) : '0px',
			color: color('text'),
			letterSpacing: spacing(-0.05),
			fontWeight: 'semi-bold'
		},
		p: {
			fontSize: spacing(4),
			lineSpacing: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(7) : `${spacing(7)}px`,
			lineHeight: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(7) : `${spacing(7)}px`,
			color: color('text'),
			letterSpacing: 0,
			fontWeight: 'regular'
		},
		body: {
			fontSize: spacing(14 / 4),
			lineSpacing: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(6) : `${spacing(6)}px`,
			lineHeight: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(6) : `${spacing(6)}px`,
			color: color('text'),
			letterSpacing: 0,
			fontWeight: 'regular'
		},
		'table-head': {
			fontSize: spacing(4),
			lineSpacing: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(6) : `${spacing(6)}px`,
			lineHeight: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(6) : `${spacing(6)}px`,
			color: color('text'),
			letterSpacing: 0,
			fontWeight: 'bold'
		},
		'table-item': {
			fontSize: spacing(4),
			lineSpacing: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(6) : `${spacing(6)}px`,
			lineHeight: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(6) : `${spacing(6)}px`,
			color: color('text'),
			letterSpacing: 0,
			fontWeight: 'regular'
		},
		list: {
			fontSize: spacing(4),
			lineSpacing: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(7) : `${spacing(7)}px`,
			lineHeight: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(7) : `${spacing(7)}px`,
			color: color('text'),
			letterSpacing: 0,
			fontWeight: 'regular'
		},
		lead: {
			fontSize: spacing(5),
			lineSpacing: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(8) : `${spacing(8)}px`,
			lineHeight: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(8) : `${spacing(8)}px`,
			color: color('text'),
			letterSpacing: 0,
			fontWeight: 'regular'
		},
		large: {
			fontSize: spacing(18 / 4),
			lineSpacing: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(8) : `${spacing(8)}px`,
			lineHeight: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(8) : `${spacing(8)}px`,
			color: color('black'),
			letterSpacing: 0,
			fontWeight: 'regular'
		},
		small: {
			fontSize: spacing(14 / 4),
			lineSpacing: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(14 / 4) : `${spacing(4)}px`,
			lineHeight: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(14 / 4) : `${spacing(4)}px`,
			color: color('black'),
			letterSpacing: 0,
			fontWeight: 'medium'
		},
		detail: {
			fontSize: spacing(14 / 4),
			lineSpacing: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(5) : `${spacing(5)}px`,
			lineHeight: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(5) : `${spacing(5)}px`,
			color: color('secondary'),
			letterSpacing: 0,
			fontWeight: 'medium'
		},
		subtle: {
			fontSize: spacing(15 / 4),
			lineSpacing: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(5) : `${spacing(5)}px`,
			lineHeight: [ 'ios', 'android' ].includes(Platform.OS) ? spacing(5) : `${spacing(5)}px`,
			color: color('slate.500'),
			letterSpacing: 0,
			fontWeight: 'regular'
		}
	}

	return {
		...typographyTheme[variant],
		...override
	}
}
