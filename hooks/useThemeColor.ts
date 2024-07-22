import Colors from 'unicpeak-ui/constants/Colors'

type ColorOptions = 50|100|200|300|400|500|600|700|800|900
type CategoryColor = `${keyof (typeof Colors.light & typeof Colors.dark)}.${ColorOptions}`
type Color = keyof typeof Colors.light | keyof typeof Colors.dark
export function useThemeColor (
	colorName: Color | CategoryColor
) {
	const theme = 'light' // useColorScheme() ?? 'light'
	const [ category, color ] = colorName?.split('.') as [Color, keyof (typeof Colors.light & typeof Colors.dark)[keyof (typeof Colors.light & typeof Colors.dark)] ]

	if (category && color && Colors[theme][category] && Colors[theme][category][color]){
		return Colors[theme][category][color]
	}
	return Colors[theme][colorName as Color] as string
}
