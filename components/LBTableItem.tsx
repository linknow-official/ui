import { LBView } from 'unicpeak/primitives/LBView'
import { useLBTheme } from 'unicpeak/hooks/useLBTheme'
import { LBText } from 'unicpeak/primitives/LBText'

type LBTableItem = {
    title: string;
    content: string;
}

export function LBTableItem ({ title, content }: LBTableItem) {
	const { color, spacing } = useLBTheme()

	return <LBView direction='horizontal' style={{
		borderColor: color('gray.200'),
		borderWidth: spacing(0.25),
		flex: 1,
		paddingHorizontal: spacing(4),
		paddingVertical: spacing(2),
		overflow: 'hidden'
	}}>
		<LBText variant="table-head" color={color('slate.900')}>{title} <LBText variant="table-head" color={color('slate.600')} fontWeight="bold">{content}</LBText></LBText>
	</LBView>
}
