import { default as TinyUrl } from 'tinyurl-api';
import { getUrlsFromContent } from '$lib/url';
import type { Actions } from './$types';

// function convert(url: string) {
// 	if (url.endsWith('yt9dd6jy')) {
// 		return Promise.reject(new Error('The API was unable to shorten the url.'));
// 	} else {
// 		return Promise.resolve(`https://done.com/${Math.floor(Math.random() * 1000000)}`);
// 	}
// }

export type Conversion = { url: string; to?: string; error?: string };

export const actions: Actions = {
	convert: async ({ request }) => {
		const data = await request.formData();
		const content = data.get('content') as string;

		const urls = getUrlsFromContent(content);

		const conversionPromises = await Promise.allSettled(
			urls.map(function convertUrl(url) {
				return TinyUrl(url);
			})
		);

		let conversions: Conversion[] = urls.map(function populatedFulfilledAndRejected(url, index) {
			const result = conversionPromises[index];

			const conversion: Conversion = {
				url
			};

			if (result.status === 'fulfilled') {
				conversion.to = result.value;
			} else {
				conversion.error = result.reason.message;
			}

			return conversion;
		});

		let newContent = content;

		conversions.forEach(function replaceInContent(conversion) {
			const { url, to } = conversion;

			if (to) {
				while (newContent.includes(url)) {
					newContent = newContent.replace(url, to);
				}
			}
		});

		return { urls, conversions, content: newContent };
	}
};
