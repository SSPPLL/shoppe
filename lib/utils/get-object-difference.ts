import { omitBy } from 'lodash';

export const getObjectDifference = (obj1: Record<string, unknown>, obj2: Record<string, unknown>) => {
	return omitBy(obj2, (value, key) => obj1[key] === value);
} 