import { useState, useEffect } from 'react'
import { Dimensions, Platform, StyleProp } from 'react-native'
import { Breakpoints, breakpoints } from 'unicpeak-ui/constants/Breakpoints'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mergeStyles = <T>(baseStyle?: any | undefined | null, breakpointStyle?: any | undefined | null): StyleProp<T> => {
	return { ...baseStyle, ...breakpointStyle } as StyleProp<T>
}

export type ExtendedStyleProp<T> = StyleProp<T> & {
  [key in keyof Breakpoints]?: StyleProp<T>;
};

const findClosestBreakpoint = (width: number, breakpoints: Breakpoints) => {
	let closestBreakpoint: keyof Breakpoints |'default' = 'default'
	let smallestDifference = Infinity

	for (const key in breakpoints){
		const breakpointWidth = breakpoints[key as keyof Breakpoints]
		const difference = width - breakpointWidth
		if (difference >= 0 && difference < smallestDifference){
			smallestDifference = difference
			closestBreakpoint = key as keyof Breakpoints
		}
	}

	return closestBreakpoint
}

const findMaxBreakpoint = <T>(style: ExtendedStyleProp<T>, breakpoints: Breakpoints, closestBreakpoint: keyof Breakpoints): string | null => {
	let maxBreakpoint: string | null = null
	let maxBreakpointValue = -1

	for (const key in style){
		if (breakpoints[key as keyof Breakpoints] !== undefined && breakpoints[key as keyof Breakpoints] <= breakpoints[closestBreakpoint]){
			if (breakpoints[key as keyof Breakpoints] > maxBreakpointValue){
				maxBreakpointValue = breakpoints[key as keyof Breakpoints]
				maxBreakpoint = key
			}
		}
	}

	return maxBreakpoint
}

const replaceBreakpoints = <T>(
	style: ExtendedStyleProp<T>,
	breakpoints: Breakpoints,
	width: number,
	recursionLimit: number = 5,
	currentDepth: number = 0
): StyleProp<T> => {
	if (!Array.isArray(style) && !(style?.xs || style?.sm || style?.md || style?.lg || style?.xl))
		return style

	if (currentDepth > recursionLimit){
		return style
	}

	const closestBreakpoint = findClosestBreakpoint(width, breakpoints)

	if (Array.isArray(style)){
		return style
			.map((item) => replaceBreakpoints(item as ExtendedStyleProp<T>, breakpoints, width, recursionLimit, currentDepth + 1))
			.reduce((pv, cv) => mergeStyles(pv, cv), {} as ExtendedStyleProp<T>) as StyleProp<T>
	}else if (typeof style === 'object' && style !== null){
		const baseStyle: Record<string, unknown> = {}
		const breakpointStyle: Record<string, unknown> = {}

		for (const key in style){
			if (breakpoints[key as keyof Breakpoints] === undefined){
				baseStyle[key] = style[key as keyof Breakpoints]
			}
		}

		const maxBreakpoint = findMaxBreakpoint(style, breakpoints, closestBreakpoint as keyof Breakpoints)
		if (maxBreakpoint){
			Object.assign(breakpointStyle, replaceBreakpoints(style[maxBreakpoint as keyof Breakpoints] as ExtendedStyleProp<T>, breakpoints, width, recursionLimit, currentDepth + 1))
		}

		return mergeStyles(baseStyle, breakpointStyle) as StyleProp<T>
	} 
	return style
}

export function useMediaQuery<T> (style?: ExtendedStyleProp<T> | ExtendedStyleProp<T>[] |null) {
	const { width } = useWidth()

	const [ replacedStyle, setReplacedStyle ] = useState(replaceBreakpoints(style || {} as ExtendedStyleProp<T>, breakpoints, width))
	useEffect(() => {
		setReplacedStyle(replaceBreakpoints(style || {} as ExtendedStyleProp<T>, breakpoints, width))
	}, [ style ])

	return { style: replacedStyle as StyleProp<T> }
}

export function generateMediaQuery<T> (style: ExtendedStyleProp<T> | ExtendedStyleProp<T>[] | null, width: number) {
	return { styles: replaceBreakpoints(style || {} as ExtendedStyleProp<T>, breakpoints, width) }
}

export function useWidth () {
	const [ width, setWidth ] = useState(Dimensions.get('window').width)

	useEffect(() => {
		const handleResize = () => {
			const newWidth = Dimensions.get('window').width
			setWidth(newWidth)
		}

		if (Platform.OS == 'web'){
			if (typeof window !== 'undefined'){
				window.addEventListener('resize', handleResize)
			}
		}

		return () => {
			if (Platform.OS == 'web'){
				if (typeof window !== 'undefined'){
					window.removeEventListener('resize', handleResize)
				}
			}
		}
	}, [ ])

	return { width }
}
