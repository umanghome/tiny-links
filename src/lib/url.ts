const URL_IN_TEXT_REGEX = /https?:\/\/(\S)+(?=\.?\s?)/g;

/**
 * Gets a list of unique URLs from a string
 */
export function getUrlsFromContent(content: string): string[] {
	const urls = (content.match(URL_IN_TEXT_REGEX) || []).map(function removeTrailingDot(url) {
		if (url.endsWith('.')) {
			return url.slice(0, -1);
		} else {
			return url;
		}
	});

	return Array.from(new Set(urls));
}
