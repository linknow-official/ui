import React from 'react'
import { View, ViewProps } from 'react-native'
import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { generateMediaQuery, useWidth } from 'unicpeak-ui/hooks/useMediaQuery'

export type DividerProps = {
  orientation?: 'vertical' | 'horizontal';
  length?: number;
  spacing?: number;
  width?: `${number}%` | number;
  height?: `${number}%` | number;
};

export function LBDivider ({ orientation = 'horizontal', length = 0.5, width, height, spacing: _spacing = 0 }: DividerProps) {
	const { color, spacing } = useLBTheme()
	const { width: deviceWidth } = useWidth()

	const borderStyle = orientation === 'vertical'
		? { marginVertical: spacing(_spacing) }
		: { marginHorizontal: spacing(_spacing) }

	const style = { style: generateMediaQuery([ {
		...(orientation === 'vertical' && {
			height: length,
			width: '100%'
		}),
		...(orientation === 'horizontal' && {
			width: length,
			height: '100%'
		}),
		...(width && {
			width
		}),
		...(height && {
			height
		}),
		backgroundColor: color('border')
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as any, borderStyle ], deviceWidth).styles } as { style: ViewProps }

	return <View {...style} />
}
