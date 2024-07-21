import { useLBTheme } from 'unicpeak/hooks/useLBTheme'
import { LBButton, LBButtonProps } from 'unicpeak/primitives/LBButton'
import { LBInput, LBInputProps } from 'unicpeak/primitives/LBInput'
import { LBText, LBTextProps } from 'unicpeak/primitives/LBText'
import { LBView } from 'unicpeak/primitives/LBView'

type LBButtonInputProps = {
    label: string;
    inputPlaceholder?: string;
    buttonContent: string;
    placeholder?: string;

    labelProps?: Partial<LBTextProps>;
    inputProps?: Partial<LBInputProps>;
    buttonProps?: Partial<LBButtonProps>;
    placeholderProps?: Partial<LBTextProps>;
}

export function LBButtonInput ({ label, labelProps, inputPlaceholder, inputProps, placeholder, placeholderProps, buttonContent, buttonProps }: Readonly<LBButtonInputProps>) {
	const { color, spacing } = useLBTheme()

	return (
		<LBView >
			{label && <LBText variant="subtle" fontWeight="bold" color={color('slate.900')} {...labelProps}>{label}</LBText>}
			<LBView direction="horizontal">
				<LBView style={{ flex: 1, marginRight: spacing(2) }}>
					<LBInput placeholder={inputPlaceholder} {...inputProps} />
				</LBView>
				<LBView style={{ maxHeight: spacing(12) }}>
					{buttonContent && <LBButton variant="primary" {...buttonProps}>{buttonContent}</LBButton>}
				</LBView>
			</LBView>
			{placeholder && <LBText variant="subtle" color={color('slate.500')} {...placeholderProps}>{placeholder}</LBText>}
		</LBView>
	)
}
