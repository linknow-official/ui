import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select'

import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { useThemeColor } from 'unicpeak-ui/hooks/useThemeColor'
import { useTypography } from 'unicpeak-ui/theme/useTypography'
import { LBText } from './LBText'
import { LBView } from './LBView'
import { ThemeProps } from './ThemeProps'

export type LBSelectProps = ThemeProps & PickerSelectProps & {
  containerStyle?: StyleProp<ViewStyle>;
  label?: string;
  bottomPlaceHolder?: boolean;
};

export function LBSelect (props: LBSelectProps) {
	const { containerStyle, label, bottomPlaceHolder, ...otherProps } = props
	const inputBorderColor = useThemeColor('inputBorder')

	const { spacing } = useLBTheme()
	const typograpgyTheme = useTypography('subtle')

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
			<View style={[ {
				borderColor: inputBorderColor,
				borderWidth: spacing(0.1),
				borderRadius: spacing(1.5),
				paddingVertical: spacing(1.5),
				paddingHorizontal: spacing(3)
			}, containerStyle ]}>
				<RNPickerSelect
					style={{
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
					}}
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
