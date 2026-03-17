export const replaceValueFromString = (
	str: string,
	replacements: Record<string, string>
): string => {
	let finalUri = str

	Object.entries(replacements).forEach(([key, value]) => {
		const regex = new RegExp(key, 'g')
		finalUri = finalUri.replace(regex, value)
	})

	return finalUri
}
