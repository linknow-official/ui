import { useLBTheme } from 'unicpeak-ui/hooks/useLBTheme'
import { LBButton } from 'unicpeak-ui/primitives/LBButton'
import { router } from 'expo-router'

type LBBackButtonProps = {
    onBack?: () => void;
    variant?: 'icon' | 'text' | 'icon-with-text';
}
export function LBBackButton ({ onBack, variant = 'icon' }: LBBackButtonProps) {
	const { color } = useLBTheme()

	if (variant == 'icon')
		return <LBButton
			variant="just-icon"
			icon="corner-up-left-white"
			override={{
				background: color('gray.900'),
				backgroundHover: color('gray.700')
			}}
			onPress={() => {
				typeof onBack == 'function' ? onBack() : router.canGoBack() ? router.back() : null
			}}
		/>

	if (variant == 'icon-with-text')
		return <LBButton
			variant="primary"
			icon="corner-up-left-white"
			override={{
				background: color('gray.900'),
				backgroundHover: color('gray.700')
			}}
			onPress={() => {
				typeof onBack == 'function' ? onBack() : router.canGoBack() ? router.back() : null
			}}
		>
        Back
		</LBButton>

	return <LBButton
		variant="primary"
		override={{
			background: color('gray.900'),
			backgroundHover: color('gray.700')
		}}
		onPress={() => {
			typeof onBack == 'function' ? onBack() : router.canGoBack() ? router.back() : null
		}}
	>
        Back
	</LBButton>
}
