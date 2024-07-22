import Logo from 'unicpeak-ui/assets/logo.svg'

export type LBLogoProps = {
    size: 'small' | 'medium' | 'large'
}

const sizeProperties = {
	'small': 18,
	'medium': 41,
	'large': 128
}

export function LBLogo (props: LBLogoProps) {
	return <Logo height={sizeProperties[props.size]} fill={'black'} />
}
