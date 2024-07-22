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
    lineSpacing: number,
    color: ReturnType<typeof useThemeColor>,
    letterSpacing: number,
    fontWeight: TypographyWeight
}

export type UseTypography = Record<TypographyVariant, TypographyTheme>

export function useTypography (variant: TypographyVariant, override?: Partial<TypographyTheme>) {
	const { color, spacing } = useLBTheme()

	const typographyTheme: UseTypography = {
		h1: {
			fontSize: 48,
			lineSpacing: 48,
			color: color('text'),
			letterSpacing: spacing(-0.012),
			fontWeight: 'extra-bold'
		},
		h2: {
			fontSize: 30,
			lineSpacing: 36,
			color: color('text'),
			letterSpacing: spacing(-0.075),
			fontWeight: 'semi-bold'
		},
		h3: {
			fontSize: 24,
			lineSpacing: 32,
			color: color('text'),
			letterSpacing: spacing(-0.06),
			fontWeight: 'semi-bold'
		},
		h4: {
			fontSize: 20,
			lineSpacing: 28,
			color: color('text'),
			letterSpacing: spacing(-0.05),
			fontWeight: 'semi-bold'
		},
		p: {
			fontSize: 16,
			lineSpacing: 28,
			color: color('text'),
			letterSpacing: 0,
			fontWeight: 'regular'
		},
		body: {
			fontSize: 14,
			lineSpacing: 24,
			color: color('text'),
			letterSpacing: 0,
			fontWeight: 'regular'
		},
		'table-head': {
			fontSize: 16,
			lineSpacing: 24,
			color: color('text'),
			letterSpacing: 0,
			fontWeight: 'bold'
		},
		'table-item': {
			fontSize: 16,
			lineSpacing: 24,
			color: color('text'),
			letterSpacing: 0,
			fontWeight: 'regular'
		},
		list: {
			fontSize: 16,
			lineSpacing: 24,
			color: color('text'),
			letterSpacing: 0,
			fontWeight: 'regular'
		},
		lead: {
			fontSize: 20,
			lineSpacing: 28,
			color: color('text'),
			letterSpacing: 0,
			fontWeight: 'regular'
		},
		large: {
			fontSize: 18,
			lineSpacing: 28,
			color: color('black'),
			letterSpacing: 0,
			fontWeight: 'regular'
		},
		small: {
			fontSize: 14,
			lineSpacing: 14,
			color: color('black'),
			letterSpacing: 0,
			fontWeight: 'medium'
		},
		detail: {
			fontSize: 14,
			lineSpacing: 20,
			color: color('secondary'),
			letterSpacing: 0,
			fontWeight: 'medium'
		},
		subtle: {
			fontSize: 15,
			lineSpacing: 20,
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
