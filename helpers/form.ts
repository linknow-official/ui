import { FormState, FieldValues } from 'react-hook-form'

export type FormValues<T extends FormState<A>, A extends FieldValues = FieldValues> = A

export const isEmptyString = (value: any) => {
	if (typeof value !== 'string') return false
	if (value.trim() == 'undefined') return false
	if (value.trim() == 'null') return false
	return value.trim().length == 0
}
