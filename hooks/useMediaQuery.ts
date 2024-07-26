import { useState, useEffect } from 'react'
import { Dimensions, StyleProp } from 'react-native'
import { Breakpoints, breakpoints, getDeviceBreakpoint } from 'unicpeak-ui/constants/Breakpoints'


const replaceBreakpoints = <T>(style: StyleProp<T> | StyleProp<T>[], breakpoint: keyof Breakpoints): StyleProp<T> => {
	if (Array.isArray(style)){
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return style.map(item => replaceBreakpoints(item as StyleProp<T>, breakpoint)).reduce((pv: any, cv: any) => ({ ...pv, ...cv }), {} as StyleProp<T>)
	}else if (typeof style === 'object' && style !== null){
		const newStyle: unknown = {}
		for (const key in style){
			if (key === breakpoint){
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				Object.assign(newStyle as any, replaceBreakpoints(style[key], breakpoint))
			}else {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(newStyle as any)[key] = replaceBreakpoints(style[key], breakpoint)
			}
		}
		return newStyle as StyleProp<T>
	}
	return style as StyleProp<T>
}

export function useMediaQuery<T> (_style: StyleProp<T>[] | StyleProp<T>) {
	const [ width, setWidth ] = useState(Dimensions.get('window').width)
	const [ currentBreakpoint, setCurrentBreakpoint ] = useState(getDeviceBreakpoint(width, breakpoints))
	const [ replacedStyle, setReplacedStyle ] = useState(replaceBreakpoints(_style, currentBreakpoint))

	useEffect(() => {
		const handleResize = () => {
			const newWidth = Dimensions.get('window').width
			setWidth(newWidth)
			const newBreakpoint = getDeviceBreakpoint(newWidth, breakpoints)
			setCurrentBreakpoint(newBreakpoint)
			setReplacedStyle(replaceBreakpoints(_style, newBreakpoint))
		}

		if (typeof window !== 'undefined'){
			window.addEventListener('resize', handleResize)
		}

		return () => {
			if (typeof window !== 'undefined'){
				window.removeEventListener('resize', handleResize)
			}
		}
	}, [ _style, width ])

	return { style: replacedStyle }
}
