import { useLBTheme } from 'unicpeak/hooks/useLBTheme'
import { LBButton, LBButtonProps } from 'unicpeak/primitives/LBButton'
import { LBText } from 'unicpeak/primitives/LBText'
import { LBView } from 'unicpeak/primitives/LBView'

type LBIntroductionListProps = {
    title: string;
    subTitle?: string;
    buttonProps?: LBButtonProps;
    children?: React.ReactNode;
}

export function LBIntroductionList ({ title, subTitle, buttonProps, children }: LBIntroductionListProps) {
	const { spacing, color } = useLBTheme()

	return (
		<LBView
			style={{
				borderRadius: spacing(2),
				backgroundColor: color('zinc.800'),
				paddingVertical: spacing(4),
				paddingHorizontal: spacing(4)
			}}
			renderItemKey={(index) => `introdction_list_${title}_${subTitle}_${index}`}
			renderItemStyle={{
				style: {
					marginVertical: spacing(1)
				}
			}}
		>
			<LBView direction="horizontal" style={{ flex: 1 }}>
				<LBView style={{ flex: 1 }}>
					{subTitle && <LBText variant="small" color={color('slate.300')}>{subTitle}</LBText>}
					<LBText variant="h4" color={color('slate.50')}>{title}</LBText>
				</LBView>
				{
					buttonProps &&
                    <LBView>
                    	<LBButton {...buttonProps} />
                    </LBView>
				}
			</LBView>

			{children}
		</LBView>
	)
}
