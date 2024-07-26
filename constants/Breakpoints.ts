export const breakpoints = {
	xs: 599,
	sm: 600,
	md: 960,
	lg: 1280,
	xl: 1920
}

export type Breakpoints = typeof breakpoints;

export const getDeviceBreakpoint = (width: number, breakpoints: Breakpoints): keyof Breakpoints => {
	if (width <= breakpoints.xs) return 'xs'
	if (width <= breakpoints.sm) return 'sm'
	if (width <= breakpoints.md) return 'md'
	if (width <= breakpoints.lg) return 'lg'
	return 'xl'
}
