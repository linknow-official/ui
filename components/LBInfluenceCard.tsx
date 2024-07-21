import { useLBTheme } from 'unicpeak/hooks/useLBTheme'
import { LBButton } from 'unicpeak/primitives/LBButton'
import { LBIcon } from 'unicpeak/primitives/LBIcon'
import { LBText } from 'unicpeak/primitives/LBText'
import { LBView } from 'unicpeak/primitives/LBView'
import { useState } from 'react'
import * as Clipboard from 'expo-clipboard'

type LBInfluenceCardProps = {
    link: string;
    date: Date;
    onPress?: () => void;
}

export function LBInfluenceCard ({ link, date, onPress }: LBInfluenceCardProps) {
	const { color, spacing } = useLBTheme()
	const [ copied, setCopied ] = useState(false)

	const handleCopy = () => {
		setCopied(true)

		try {
			navigator.clipboard.writeText(link).then(() => {})
		}catch (exception){/* empty */}

		try {
			Clipboard.setStringAsync(link).then(() => {})
		}catch (exception){/* empty */}

		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<LBView direction='horizontal' style={{
			borderColor: color('slate.200'),
			borderRadius: spacing(1.5),
			borderWidth: spacing(0.25),
			padding: spacing(4)
		}}>
			<LBView style={{
				flex: 5,
				marginBottom: spacing(2)
			}}>
				<LBText
					variant="detail"
					color={color('slate.900')}
					style={{
					}}
				>
                    Share with your followers
				</LBText>
				<LBText
					variant="table-head"
					color={color('slate.900')}
					style={{
						marginBottom: spacing(1)
					}}
				>
					{link}
				</LBText>
				<LBView
					direction='horizontal'
					style={{
						flex: 1
					}}
				>
					<LBView direction="horizontal">
						<LBText variant="small" color={color('slate.500')}>
							<LBView style={{ marginRight: spacing(1) }}>
								<LBIcon icon='calendar' fill={color('gray.100')} />
							</LBView> Created at <LBText variant="small" fontWeight="bold">{date.toLocaleDateString()} {date.toLocaleTimeString()}</LBText>
						</LBText>
					</LBView>
				</LBView>
				<LBView direction="horizontal" style={{ alignItems: 'center', marginTop: spacing(2) }}>
					<LBButton fullWidth variant='just-icon' icon="copy" onPress={handleCopy}>
						<LBText variant="small" color={copied ? color('green.500') : color('slate.900')} style={{ marginLeft: spacing(1) }}>{copied ? 'Copied' : 'Copy'}</LBText>
					</LBButton>
				</LBView>
			</LBView>
			{
				onPress &&
                <LBView style={{
                	padding: spacing(2),
                	alignItems: 'flex-start'
                }}>
                	<LBButton variant="primary" onPress={onPress}>
                        See
                	</LBButton>
                </LBView>
			}
		</LBView>
	)
}
