
export const breakpoints = {
	xs: '599px',
	sm: '600px',
	md: '960px',
	lg: '1280px',
	xl: '1920px'
}

export type Breakpoints = typeof breakpoints;

export const getDeviceBreakpoint = (width: number, breakpoints: Breakpoints): keyof Breakpoints => {
	if (width <= parseInt(breakpoints.xs)) return 'xs'
	if (width <= parseInt(breakpoints.sm)) return 'sm'
	if (width <= parseInt(breakpoints.md)) return 'md'
	if (width <= parseInt(breakpoints.lg)) return 'lg'
	return 'xl'
}
