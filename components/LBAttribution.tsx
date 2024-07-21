import { LBView } from 'unicpeak/primitives/LBView'
import { useLBTheme } from 'unicpeak/hooks/useLBTheme'
import { LBText } from 'unicpeak/primitives/LBText'
import { Icon } from 'unicpeak/theme/useIcon'

type LBAttributionProps = {
    title: string;
    icon: Icon;
    type?: 'normal' | 'money';
    attributionCount: number;
    totalAttribution: number;
}

export function LBAttribution ({ title, type, attributionCount, totalAttribution }: LBAttributionProps) {
	const { color, spacing } = useLBTheme()

	if (type == 'money'){
		return <LBView direction='vertical' style={{
			borderColor: color('gray.200'),
			borderRadius: spacing(1.5),
			borderWidth: spacing(0.25),
			flex: 1,
			backgroundColor: color('white'),
			padding: spacing(4)
		}}>
			<LBText fontWeight="bold" variant="subtle" color={color('slate.900')}>{title}</LBText>
			<LBView direction="horizontal" style={{
				alignItems: 'center'
			}}>
				<LBText variant="h2" color={color('slate.600')} fontWeight="extra-bold">${attributionCount}</LBText>
			</LBView>
		</LBView>
	}

	return <LBView direction='vertical' style={{
		borderColor: color('gray.200'),
		borderRadius: spacing(1.5),
		borderWidth: spacing(0.25),
		flex: 1,
		backgroundColor: color('white'),
		padding: spacing(4)
	}}>
		<LBText fontWeight="bold" variant="subtle" color={color('slate.900')}>{title}</LBText>
		<LBView direction="horizontal" style={{
			alignItems: 'center'
		}}>
			<LBText variant="h2" color={color('slate.600')} fontWeight="extra-bold">{attributionCount}</LBText>
		</LBView>
		{totalAttribution != 0 && <>
			<LBText variant="small" color={color('slate.500')} style={{ marginBottom: spacing(1) }}>out of {totalAttribution}</LBText>
			<LBView style={{
				borderRadius: spacing(10),
				backgroundColor: color('slate.100'),
				overflow: 'hidden',
				height: spacing(4)
			}}>
				<LBView
					style={{
						borderRadius: spacing(10),
						backgroundColor: color('slate.900'),
						overflow: 'hidden',
						width: `${attributionCount / totalAttribution * 100}%`,
						height: spacing(4)
					}}>
				</LBView>
			</LBView>
		</>}
	</LBView>
}
