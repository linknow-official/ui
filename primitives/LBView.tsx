import { useThemeColor } from 'unicpeak-ui/hooks/useThemeColor'
import React, { ReactElement } from 'react'
import { View as DefaultView, FlatList, StyleProp, ViewStyle } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ThemeProps } from './ThemeProps'
import { ExtendedStyleProp, useMediaQuery } from 'unicpeak-ui/hooks/useMediaQuery'

const generateUniqueId = (() => {
	let counter = 0
	return () => `custom-id-${counter++}`
})()

type BaseLBViewProps = ThemeProps & {
    scrollView?: boolean,
    flatList?: boolean,
    grid?: boolean,
    center?: boolean,
    renderItemStyle?: Partial<LBViewProps>;
    renderItemKey?: (index: number) => string;
    style?: ExtendedStyleProp<ViewStyle>;
};

export type LBFlatViewProps = BaseLBViewProps & {
    flatList?: boolean,
    direction?: 'horizontal' | 'vertical',
    contentContainerStyle?: ViewStyle,
} & Partial<FlatList['props']>

export type LBGridViewProps = BaseLBViewProps & {
    grid?: boolean,
} & Partial<DefaultView['props']>

export type LBScrollViewProps = BaseLBViewProps & {
    scrollView?: boolean,
    direction?: 'horizontal' | 'vertical',
    contentContainerStyle?: ViewStyle,
} & Partial<DefaultView['props']>

export type LBViewProps = LBFlatViewProps | LBScrollViewProps

export function LBView (props: LBViewProps) {
	const { style: _style, scrollView, grid, renderItemStyle: _renderItemViewProps, renderItemKey, flatList, children, direction = 'vertical', center, ...otherProps } = props
	const backgroundColor = useThemeColor('background')
	const { style } = useMediaQuery(_style) as { style: ExtendedStyleProp<ViewStyle> }
	const renderItemStyle = useMediaQuery(_renderItemViewProps?.style) as { style: ExtendedStyleProp<ViewStyle> }

	if (grid){
		return (
			<DefaultView
				{...otherProps}
				style={[
					{
						flex: 1,
						flexDirection: 'row',
						flexWrap: 'wrap'
					},
					style
				]}
			>
				{(children as React.ReactNode[])?.map((item, index) => (
					<DefaultView
						{...(renderItemKey ? { key: renderItemKey(index) } : { key: `${generateUniqueId()}_index` })}
						style={{
							flexBasis: '50%', // Adjust as needed for your grid layout
							paddingHorizontal: 5 // Add spacing between grid items
						}}
					>
						{item}
					</DefaultView>
				))}
			</DefaultView>
		)
	}

	if (flatList){
		return (
			<FlatList<React.ReactNode>
				bounces={false}
				horizontal={direction === 'horizontal'}
				data={children as React.ReactNode[]}
				renderItem={({ item, index }) => {
					if (renderItemStyle && item){
						return <LBView
							{...(renderItemKey ? { key: renderItemKey(index) } : { key: `${generateUniqueId()}_index` })}
							{..._renderItemViewProps}
							{...renderItemStyle}
						>
							{item}
						</LBView>
					}

					return item as unknown as ReactElement<React.ReactNode>
				}}
				contentContainerStyle={{
					...(center && {
						flexGrow: 1,
						justifyContent: 'center'
					}),
					...otherProps?.contentContainerStyle as Partial<StyleProp<ViewStyle>>
				}}
				style={[ { backgroundColor }, style, { flex: 1 } ]}
				{...otherProps}
			/>
		)
	}

	if (scrollView){
		return (
			<KeyboardAwareScrollView
				extraScrollHeight={64}
				extraHeight={64}
				bounces={false}
				horizontal={direction === 'horizontal'}
				contentInsetAdjustmentBehavior='automatic'
				{...otherProps}
				contentContainerStyle={{
					...(center && {
						flexGrow: 1,
						justifyContent: 'center'
					}),
					...otherProps?.contentContainerStyle as Partial<StyleProp<ViewStyle>>
				}}
				style={[ { backgroundColor }, style, { flex: 1 } ]}
			>
				{(children as React.ReactNode[])?.length > 0 ? (children as React.ReactNode[]).map((item, index) => {
					if (renderItemStyle && item){
						return <LBView
							{...(renderItemKey ? { key: renderItemKey(index) } : { key: `${generateUniqueId()}_index` })}
							{..._renderItemViewProps}
							{...renderItemStyle}
						>
							{item}
						</LBView>
					}

					return item as unknown as React.ReactNode
				}) : children}
			</KeyboardAwareScrollView>
		)
	}

	const defaultViewStyle = useMediaQuery([
		{ flexDirection: direction === 'horizontal' ? 'row' : 'column' },
		center && { alignItems: 'center', justifyContent: 'center' },
		style
	])

	return (
		<DefaultView
			{...otherProps}
			{...defaultViewStyle}
		>
			{(children as React.ReactNode[])?.length > 0 ? (children as React.ReactNode[]).map((item, index) => {
				if (renderItemStyle && item){
					return <LBView
						{...(renderItemKey ? { key: renderItemKey(index) } : { key: `${generateUniqueId()}_index` })}
						{..._renderItemViewProps}
						{...renderItemStyle}
					>
						{item}
					</LBView>
				}

				return item as unknown as React.ReactNode
			}) : children}
		</DefaultView>
	)
}
