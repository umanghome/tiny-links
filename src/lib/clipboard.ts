/**
 * Copies some text to clipboard
 */
export function copyToClipboard(text: string): Promise<void> {
	if ('clipboard' in navigator) {
		return navigator.clipboard.writeText(text);
	}

	// Fallback for Safari and IE
	return new Promise(function (resolve, reject) {
		var textarea = document.createElement('textarea');
		textarea.value = text;
		document.body.appendChild(textarea);
		textarea.select();

		try {
			document.execCommand('copy');
			resolve();
		} catch (err) {
			reject();
		} finally {
			document.body.removeChild(textarea);
		}
	});
}
