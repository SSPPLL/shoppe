export function isPageNumberValid(currentPage: unknown, totalPages: number): boolean {
	const parsed = Number(currentPage);

	if (Number.isNaN(parsed) || parsed < 1 || parsed > totalPages) return false;

	return true;
}