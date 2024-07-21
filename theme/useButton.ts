import { defaultTheme } from 'unicpeak/constants/Colors'
import { LBTheme, useLBTheme } from 'unicpeak/hooks/useLBTheme'
import { LBIconProps } from 'unicpeak/primitives/LBIcon'
import { LBTextProps } from 'unicpeak/primitives/LBText'

export type ButtonVariant =
'primary' |
'descructive' |
'outline' |
'subtle' |
'ghost' |
'link' |
'just-icon' |
'just-icon-circle' |
'tab'

export type ButtonTheme = {
	minHeight?: number,
	minWidth?: number,

	maxHeight?: number,
	maxWidth?: number,

	borderRadius: number,
	borderWidth: number,
	borderColor: ReturnType<LBTheme['color']>,
	borderColorHover: ReturnType<LBTheme['color']>,
	background: ReturnType<LBTheme['color']>,
	backgroundHover: ReturnType<LBTheme['color']>,

	disabledBackground: ReturnType<LBTheme['color']>,
	disabledBorderColor: ReturnType<LBTheme['color']>,
	disabledBorderRadius: number,
	disabledBorderWidth: number,

	text: Partial<LBTextProps>,

	icon?: Partial<LBIconProps>,

	paddingHorizontal: number,
	paddingVertical: number,
}

export type UseButton = Record<ButtonVariant, ButtonTheme>

export function useButton (variant: ButtonVariant, override?: Partial<ButtonTheme>) {
	const { color } = useLBTheme()

	const buttonTheme: UseButton = {
		primary: {
			minHeight: 40,

			borderRadius: 1.5,
			borderWidth: 1,
			borderColor: color('slate.900'),
			borderColorHover: color('slate.700'),

			background: color('slate.900'),
			backgroundHover: color('slate.700'),

			disabledBackground: color('disabled'),
			disabledBorderColor: color('disabled'),
			disabledBorderRadius: 1.5,
			disabledBorderWidth: 1,

			text: {
				color: defaultTheme.colors['white'],
				underlineColor: 'transparent'
			},

			paddingHorizontal: 4,
			paddingVertical: 2
		},
		descructive: {
			minHeight: 40,

			borderRadius: 1.5,
			borderWidth: .25,
			borderColor: color('red.500'),
			borderColorHover: color('red.600'),

			background: color('red.500'),
			backgroundHover: color('red.600'),

			disabledBackground: color('disabled'),
			disabledBorderColor: color('disabled'),
			disabledBorderRadius: 1.5,
			disabledBorderWidth: 1,

			text: {
				color: defaultTheme.colors['white'],
				underlineColor: 'transparent'
			},

			paddingHorizontal: 4,
			paddingVertical: 2
		},
		outline: {
			minHeight: 40,

			borderRadius: 1.5,
			borderWidth: 1,
			borderColor: color('slate.200'),
			borderColorHover: color('slate.200'),

			background: defaultTheme.colors['white'],
			backgroundHover: color('slate.200'),

			disabledBackground: color('disabled'),
			disabledBorderColor: color('disabled'),
			disabledBorderRadius: 1.5,
			disabledBorderWidth: 1,

			text: {
				color: color('slate.900'),
				underlineColor: 'transparent'
			},

			paddingHorizontal: 4,
			paddingVertical: 2
		},
		subtle: {
			minHeight: 40,

			borderRadius: 1.5,
			borderWidth: .25,
			borderColor: color('slate.100'),
			borderColorHover: color('slate.200'),

			background: color('slate.100'),
			backgroundHover: color('slate.200'),

			disabledBackground: color('disabled'),
			disabledBorderColor: color('disabled'),
			disabledBorderRadius: 1.5,
			disabledBorderWidth: 1,

			text: {
				color: color('slate.900'),
				underlineColor: 'transparent'
			},

			paddingHorizontal: 4,
			paddingVertical: 2
		},
		ghost: {
			minHeight: 40,

			borderRadius: 1.5,
			borderWidth: .25,
			borderColor: defaultTheme.colors['white'],
			borderColorHover: color('slate.100'),

			background: defaultTheme.colors['white'],
			backgroundHover: color('slate.100'),

			disabledBackground: color('disabled'),
			disabledBorderColor: color('disabled'),
			disabledBorderRadius: 1.5,
			disabledBorderWidth: 1,

			text: {
				color: color('slate.900'),
				underlineColor: 'transparent'
			},

			paddingHorizontal: 4,
			paddingVertical: 2
		},
		link: {
			minHeight: 40,

			borderRadius: 1.5,
			borderWidth: .25,
			borderColor: defaultTheme.colors['white'],
			borderColorHover: defaultTheme.colors['white'],

			background: defaultTheme.colors['white'],
			backgroundHover: defaultTheme.colors['white'],

			disabledBackground: color('disabled'),
			disabledBorderColor: color('disabled'),
			disabledBorderRadius: 1.5,
			disabledBorderWidth: 1,

			text: {
				color: color('slate.900'),
				underlineColor: color('slate.900')
			},

			paddingHorizontal: 4,
			paddingVertical: 2
		},
		'just-icon': {
			minHeight: 40,
			minWidth: 40,

			borderRadius: 1.5,
			borderWidth: 1,
			borderColor: defaultTheme.colors['slate'][200],
			borderColorHover: defaultTheme.colors['slate'][200],

			background: defaultTheme.colors['white'],
			backgroundHover: defaultTheme.colors['slate'][100],

			disabledBackground: color('disabled'),
			disabledBorderColor: color('disabled'),
			disabledBorderRadius: 1.5,
			disabledBorderWidth: 1,

			text: {},
			icon: {
				fill: defaultTheme.colors['black']
			},

			paddingHorizontal: 3,
			paddingVertical: 3
		},
		'just-icon-circle': {
			minHeight: 40,
			minWidth: 40,

			borderRadius: 96,
			borderWidth: 1,
			borderColor: defaultTheme.colors['slate'][200],
			borderColorHover: defaultTheme.colors['slate'][200],

			background: defaultTheme.colors['white'],
			backgroundHover: defaultTheme.colors['slate'][100],

			disabledBackground: color('disabled'),
			disabledBorderColor: color('disabled'),
			disabledBorderRadius: 1.5,
			disabledBorderWidth: 1,

			text: {},
			icon: {
				fill: defaultTheme.colors['black']
			},

			paddingHorizontal: 3,
			paddingVertical: 3
		},
		tab: {
			minHeight: 32,

			borderRadius: 1.3,
			borderWidth: .3,
			borderColor: defaultTheme.colors['slate'][200],
			borderColorHover: defaultTheme.colors['white'],

			background: defaultTheme.colors['slate'][200],
			backgroundHover: defaultTheme.colors['white'],

			disabledBackground: color('disabled'),
			disabledBorderColor: color('disabled'),
			disabledBorderRadius: 1.5,
			disabledBorderWidth: 1,

			text: {
				variant: 'subtle'
			},

			paddingHorizontal: 3,
			paddingVertical: 1.5
		}
	}

	return {
		...buttonTheme[variant],
		...override
	}
}
