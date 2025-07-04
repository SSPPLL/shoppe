export function declineWordByNumber(number: number, words: [string, string, string]) {
	number = Math.abs(number) % 100;
	const lastDigit = number % 10;

	if (number > 10 && number < 20) {
		return words[2];
	}
	if (lastDigit > 1 && lastDigit < 5) {
		return words[1];
	}
	if (lastDigit === 1) {
		return words[0];
	}
	return words[2];
}