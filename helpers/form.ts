import { FormState, FieldValues } from 'react-hook-form'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type FormValues<T extends FormState<A>, A extends FieldValues = FieldValues> = A

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmptyString = (value: any) => {
	if (typeof value !== 'string') return false
	if (value.trim() == 'undefined') return false
	if (value.trim() == 'null') return false
	return value.trim().length == 0
}
