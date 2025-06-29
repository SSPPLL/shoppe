export function queryStringToObject(queryString: string): Record<string, unknown> {
	const queryObject: Record<string, unknown> = {};

	if (!queryString) {
		return queryObject;
	}

	const queryPairs = queryString.split('&');

	for (const queryPair of queryPairs) {
		const [encodedKey, encodedValue] = queryPair.split('=');
		const key = decodeURIComponent(encodedKey);
		const value = decodeURIComponent(encodedValue);

		const arrayMatch = key.match(/^(.+)\[(\d+)\]$/);

		if (arrayMatch) {
			const arrayName = arrayMatch[1];
			const arrayIndex = parseInt(arrayMatch[2], 10);

			if (!queryObject[arrayName]) {
				queryObject[arrayName] = [];
			}

			(queryObject[arrayName] as unknown[])[arrayIndex] = Number.isNaN(Number(value)) ? value : Number(value);
		} else {
			queryObject[key] = Number.isNaN(Number(value)) ? value : Number(value);
		}
	}

	return queryObject;
}

export function objectToQueryString<T extends object>(
	obj: T,
	prefix?: string
): string {
	const queryString: string[] = [];

	for (const key in obj) {
		if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

		const value = obj[key];
		if (value === undefined || value === null) continue;

		const fullKey = prefix
			? `${prefix}[${encodeURIComponent(key)}]`
			: encodeURIComponent(key);

		if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
			queryString.push(objectToQueryString(value as Record<string, unknown>, fullKey));
		} else {
			queryString.push(`${fullKey}=${encodeURIComponent(String(value))}`);
		}
	}

	return queryString.join('&');
}
