import React from 'react'
import { TextInput, TextInputProps, TextStyle } from 'react-native'

import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { useThemeColor } from 'unicpeak-ui/hooks/useThemeColor'
import { useTypography } from 'unicpeak-ui/theme/useTypography'
import { FieldError } from 'react-hook-form'
import { LBText } from './LBText'
import { LBView, LBViewProps } from './LBView'
import { ThemeProps } from './ThemeProps'
import { ExtendedStyleProp } from 'unicpeak-ui/hooks/useMediaQuery'

export type LBInputProps = ThemeProps & TextInputProps & {
    rightComponent?: React.ReactNode;
    rightComponentContainerStyle?: Partial<LBViewProps>;
    containerStyle?: Partial<LBViewProps>;
    label?: string
    bottomPlaceHolder?: boolean;
    error?: FieldError
    style?: ExtendedStyleProp<TextStyle>
};

export function LBInput (props: LBInputProps) {
	const { containerStyle, style, label, value, bottomPlaceHolder, rightComponent, rightComponentContainerStyle, error, ...otherProps } = props
	const inputBorderColor = useThemeColor('inputBorder')
	const cursorColor = useThemeColor('cursor')
	const selectionColor = useThemeColor('selection')

	const { spacing, color } = useLBTheme()
	const typograpgyTheme = useTypography('subtle')

	return (
		<LBView
			renderItemKey={(index) => `input_${label}_${index}`}
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
			<LBView style={{
				justifyContent: 'space-between',
				borderColor: error ? color('inputError') : inputBorderColor,
				borderWidth: spacing(0.1),
				borderRadius: spacing(1.5),
				paddingVertical: spacing(1.5),
				paddingHorizontal: spacing(3)
			}}
			direction='horizontal'
			center
			{...containerStyle}
			>
				<TextInput
					style={[
						{
							minHeight: 36,
							color: typograpgyTheme.color,
							fontSize: typograpgyTheme.fontSize,
							lineHeight: typograpgyTheme.lineSpacing,
							letterSpacing: typograpgyTheme.letterSpacing,
							fontFamily: typograpgyTheme.fontWeight,
							zIndex: 2,
							flex: 1
						},
						style
					]}
					placeholderTextColor={useThemeColor('placeholder')}
					cursorColor={cursorColor}
					selectionColor={selectionColor}
					{...otherProps}
					value={value}
					placeholder={bottomPlaceHolder ? '' : otherProps.placeholder}
				/>
				{!!rightComponent &&
                    <LBView
                    	style={{
                    		position: 'absolute',
                    		right: 0,
                    		height: '130%',
                    		width: spacing(10),
                    		backgroundColor: color('gray.200'),
                    		borderTopRightRadius: spacing(1),
                    		borderBottomRightRadius: spacing(1),
                    		zIndex: -1
                    	}}
                    	center
                    	{...rightComponentContainerStyle}
                    >
                    	{rightComponent}
                    </LBView>
				}
			</LBView>
			{error && (
				<LBText style={{ color: color('inputError'), marginTop: spacing(0.5) }} variant="subtle">
					{error.message}
				</LBText>
			)}
			{bottomPlaceHolder && otherProps.placeholder && <LBText variant="subtle">
				{otherProps.placeholder}
			</LBText>}
		</LBView>
	)
}
