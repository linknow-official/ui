import { useSpacing } from './useSpacing'
import { useThemeColor } from './useThemeColor'

export type LBTheme = ReturnType<typeof useLBTheme>
export function useLBTheme () {
	return {
		color: useThemeColor,
		spacing: useSpacing
	}
}
