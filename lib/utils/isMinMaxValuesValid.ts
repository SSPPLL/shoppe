export interface IMinMaxValues {
	defaultMin: number
	defaultMax: number
	min: string | null
	max: string | null
}

export const isMinMaxValuesValid = ({ defaultMin, defaultMax, min, max }: IMinMaxValues): boolean => {
	const isMin = typeof min !== 'undefined' && min !== null;
	const isMax = typeof max !== 'undefined' && max !== null;

	if (isMin && (Number.isNaN(Number(min)) || Number(min) < defaultMin)) return false;
	if (isMax && (Number.isNaN(Number(max)) || Number(max) > defaultMax)) return false;
	if (isMin && isMax && Number(min) > Number(max)) return false;

	return true;
}