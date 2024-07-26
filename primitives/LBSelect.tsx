import React from 'react'
import { View, ViewStyle } from 'react-native'
import RNPickerSelect, { PickerSelectProps, PickerStyle } from 'react-native-picker-select'

import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { useThemeColor } from 'unicpeak-ui/hooks/useThemeColor'
import { useTypography } from 'unicpeak-ui/theme/useTypography'
import { LBText } from './LBText'
import { LBView } from './LBView'
import { ThemeProps } from './ThemeProps'
import { ExtendedStyleProp, useMediaQuery } from 'unicpeak-ui/hooks/useMediaQuery'

export type LBSelectProps = ThemeProps & PickerSelectProps & {
    containerStyle?: ExtendedStyleProp<ViewStyle>;
    label?: string;
    bottomPlaceHolder?: boolean;
    style?: ExtendedStyleProp<View>;
};

export function LBSelect (props: LBSelectProps) {
	const { containerStyle, label, bottomPlaceHolder, ...otherProps } = props
	const inputBorderColor = useThemeColor('inputBorder')

	const { spacing } = useLBTheme()
	const typograpgyTheme = useTypography('subtle')

	const containerViewStyle = useMediaQuery([ {
		borderColor: inputBorderColor,
		borderWidth: spacing(0.1),
		borderRadius: spacing(1.5),
		paddingVertical: spacing(1.5),
		paddingHorizontal: spacing(3)
	}, containerStyle ])

	const rnPickerStyle = useMediaQuery({
		inputIOS: {
			minHeight: spacing(9),
			color: typograpgyTheme.color,
			fontSize: typograpgyTheme.fontSize,
			lineHeight: typograpgyTheme.lineSpacing,
			letterSpacing: typograpgyTheme.letterSpacing,
			fontFamily: typograpgyTheme.fontWeight
		},
		inputAndroid: {
			minHeight: spacing(9),
			color: typograpgyTheme.color,
			fontSize: typograpgyTheme.fontSize,
			lineHeight: typograpgyTheme.lineSpacing,
			letterSpacing: typograpgyTheme.letterSpacing,
			fontFamily: typograpgyTheme.fontWeight
		},
		placeholder: {
			color: useThemeColor('placeholder')
		}
	}) as { style: PickerStyle }

	return (
		<LBView
			renderItemKey={(index) => `select_${label}_${index}`}
			renderItemStyle={{
				style: {
					paddingVertical: spacing(0.2)
				}
			}}
		>
			{label && (
				<LBText style={{ marginBottom: spacing(1) }} variant='small'>
					{label}
				</LBText>
			)}
			<View {...containerViewStyle}>
				<RNPickerSelect
					{...rnPickerStyle}
					useNativeAndroidPickerStyle={false}
					{...otherProps}
				/>
			</View>
			{bottomPlaceHolder && otherProps.placeholder && <LBText variant="subtle">
				{otherProps.placeholder as string}
			</LBText>}
		</LBView>
	)
}
