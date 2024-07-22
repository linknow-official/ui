import { Icon, useIcon, IconProps } from 'unicpeak-ui/theme/useIcon'

export type LBIconProps = Partial<IconProps> & {
    icon: Icon;
}

export function LBIcon (props: LBIconProps) {
	return useIcon(props.icon, props)
}
