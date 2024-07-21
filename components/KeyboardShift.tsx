import { useHeaderHeight } from '@react-navigation/elements'
import React, { useState, useEffect } from 'react'
import {
	KeyboardAvoidingView as RNKeyboardAvoidingView,
	Platform,
	StyleSheet,
	KeyboardAvoidingViewProps,
	SafeAreaView,
	Dimensions
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const BEHAVIOR = Platform.OS === 'ios' ? 'padding' : undefined

const BaseKeyboardAvoidingView = ({ style, ...props }: KeyboardAvoidingViewProps) => {
	const headerHeight = useHeaderHeight()

	return (
		<RNKeyboardAvoidingView
			style={[ styles.container, style ]}
			behavior={BEHAVIOR}
			keyboardVerticalOffset={headerHeight}
			{...props}
		/>
	)
}

const IOSKeyboardAvoidingView = ({ children, ...props }: KeyboardAvoidingViewProps) => {
	const insets = useSafeAreaInsets()
	const [ screenHeight, setScreenHeight ] = useState(0)

	useEffect(() => {
		const subscription = Dimensions.addEventListener('change', (event) => {
			setScreenHeight(event.screen.height)
		})

		return () => {
			subscription.remove()
		}
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<BaseKeyboardAvoidingView enabled {...props} keyboardVerticalOffset={screenHeight - insets.bottom}>
				{children}
			</BaseKeyboardAvoidingView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

const KeyboardShift = Platform.OS === 'ios' ? IOSKeyboardAvoidingView : BaseKeyboardAvoidingView

export default KeyboardShift
