import { useLBTheme } from 'unicpeak/hooks/useLBTheme'
import { LBButton } from 'unicpeak/primitives/LBButton'
import { LBLogo } from 'unicpeak/primitives/LBLogo'
import { LBView } from 'unicpeak/primitives/LBView'
import { useRouter } from 'expo-router'

export type LBProfileHeaderProps = {
    noProfile?: boolean
}

export function LBProfileHeader ({ noProfile }: LBProfileHeaderProps) {
	const { spacing } = useLBTheme()
	const router = useRouter()

	const onPressProfile = () => {
		router.push('/(modal)/profile')
	}

	return <LBView direction='horizontal' style={{
		marginBottom: spacing(4),
		justifyContent: 'space-between'
	}}>
		<LBLogo size='medium' />
		{
			!noProfile && <LBButton
				icon='user'
				variant='just-icon-circle'
				onPress={onPressProfile}
			/>
		}
	</LBView>
}
