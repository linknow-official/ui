import { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { breakpoints, getDeviceBreakpoint } from 'unicpeak-ui/constants/Breakpoints'

export function useDeviceBreakpoint () {
	const [ width, setWidth ] = useState(Dimensions.get('window').width)
	const [ currentBreakpoint, setCurrentBreakpoint ] = useState(getDeviceBreakpoint(width, breakpoints))

	useEffect(() => {
		const handleResize = () => {
			const newWidth = Dimensions.get('window').width
			setWidth(newWidth)
			const newBreakpoint = getDeviceBreakpoint(newWidth, breakpoints)
			setCurrentBreakpoint(newBreakpoint)
		}

		if (typeof window !== 'undefined'){
			window.addEventListener('resize', handleResize)
		}

		return () => {
			if (typeof window !== 'undefined'){
				window.removeEventListener('resize', handleResize)
			}
		}
	}, [ width ])

	return { currentBreakpoint }
}
