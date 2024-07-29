import { useThemeColor } from 'unicpeak-ui/hooks/useThemeColor'
import React, { ReactElement, useMemo } from 'react'
import { View as DefaultView, FlatList, Platform, StyleProp, ViewStyle } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ThemeProps } from './ThemeProps'
import { ExtendedStyleProp, generateMediaQuery, useMediaQuery, useWidth } from 'unicpeak-ui/hooks/useMediaQuery'

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
    grid: true,
    renderGridItemStyle?: (item: React.ReactNode, index: number) => ExtendedStyleProp<BaseLBViewProps['style']>;
} & Partial<DefaultView['props']>

export type LBScrollViewProps = BaseLBViewProps & {
    scrollView?: boolean,
    direction?: 'horizontal' | 'vertical',
    contentContainerStyle?: ViewStyle,
} & Partial<DefaultView['props']>

export type LBViewProps = LBFlatViewProps | LBScrollViewProps | LBGridViewProps

export function LBView (props: LBViewProps) {
	const { style: _style, scrollView, renderItemStyle: _renderItemViewProps, renderItemKey, flatList, children, center, ...otherProps } = props
	const backgroundColor = useThemeColor('background')
	const { width } = useWidth()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { style } = (Platform.OS == 'web' ? useMediaQuery(_style) as { style: ExtendedStyleProp<ViewStyle> } : { style: generateMediaQuery(_style as ExtendedStyleProp<ViewStyle>, width).styles }) as { style: any }
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const renderItemStyle = { style: generateMediaQuery((_renderItemViewProps as any)?.style, width).styles }
	const { renderGridItemStyle } = props as LBGridViewProps
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const renderGridItemStyles = (children as React.ReactNode[])?.length > 0 ? (children as React.ReactNode[])?.map((item, index) => (renderGridItemStyle ? generateMediaQuery(renderGridItemStyle(item, index), width).styles as any || {} : {})) : []

	const uniqueId = useMemo(() => generateUniqueId(), [])

	if (props.grid == true){
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
				{(children as React.ReactNode[])?.length > 0 ? (children as React.ReactNode[])?.map((item, index) => (
					<DefaultView
						style={{
							flexBasis: '50%',
							paddingHorizontal: 5,
							...renderGridItemStyles?.[index]
						}}

						{...(renderItemKey ? { key: renderItemKey(index) } : { })}
					>
						{item}
					</DefaultView>
				)) : children}
			</DefaultView>
		)
	}

	if (flatList){
		return (
			<FlatList<React.ReactNode>
				bounces={false}
				horizontal={(props.direction || 'vertical') === 'horizontal'}
				data={children as React.ReactNode[]}
				renderItem={({ item, index }) => {
					if (renderItemStyle && item){
						return <LBView

							{...(renderItemKey ? { key: renderItemKey(index) } : { key: uniqueId + index })}
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
					...props?.contentContainerStyle as Partial<StyleProp<ViewStyle>>
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
				horizontal={(props.direction || 'vertical') === 'horizontal'}
				contentInsetAdjustmentBehavior='automatic'
				{...otherProps}
				contentContainerStyle={{
					...(center && {
						flexGrow: 1,
						justifyContent: 'center'
					}),
					...props?.contentContainerStyle as Partial<StyleProp<ViewStyle>>
				}}
				style={[ { backgroundColor }, style, { flex: 1 } ]}
			>
				{(children as React.ReactNode[])?.length > 0 ? (children as React.ReactNode[]).map((item, index) => {
					if (renderItemStyle && item){
						return <LBView

							{...(renderItemKey ? { key: renderItemKey(index) } : { key: uniqueId + index })}
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
		{ flexDirection: (props.direction || 'vertical') === 'horizontal' ? 'row' : 'column' },
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

						{...(renderItemKey ? { key: renderItemKey(index) } : { key: uniqueId + index })}
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
