import { useState, useEffect } from 'react'
import { Dimensions, Platform } from 'react-native'
import { Breakpoints, breakpoints, getDeviceBreakpoint } from 'unicpeak-ui/constants/Breakpoints'

export function useDeviceBreakpoint (maxBreakpoint?: keyof Breakpoints) {
	const [ width, setWidth ] = useState(Dimensions.get('window').width)
	const [ currentBreakpoint, setCurrentBreakpoint ] = useState(getDeviceBreakpoint(width, breakpoints))

	useEffect(() => {
		const handleResize = () => {
			const newWidth = Dimensions.get('window').width
			setWidth(newWidth)
			const newBreakpoint = getDeviceBreakpoint(newWidth, breakpoints)
			setCurrentBreakpoint(newBreakpoint)
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
	}, [ width ])

	return { currentBreakpoint: maxBreakpoint && width > breakpoints[maxBreakpoint || currentBreakpoint] ? maxBreakpoint : currentBreakpoint }
}
