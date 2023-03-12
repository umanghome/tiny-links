export function isClipboardSupported() {
	return 'clipboard' in navigator;
}

/**
 * Copies some text to clipboard
 */
export function copyToClipboard(text: string) {
	if ('clipboard' in navigator) {
		return navigator.clipboard.writeText(text);
	} else {
		return Promise.reject(new Error('Clipboard is unsupported in this browser'));
	}
}
