const BASE_URL = "https://ctenvios.com";
const DEFAULT_OG_IMAGE = "https://ctenvios.com/banner-discounts-compressed.jpg";

export const seoDefaults = {
	baseUrl: BASE_URL,
	defaultOgImage: DEFAULT_OG_IMAGE,
};

export function buildServiceMetadata({ page, title, keywords }) {
	const canonicalPath = `/${page.slug}`;

	return {
		title,
		description: page.description,
		keywords,
		alternates: {
			canonical: canonicalPath,
		},
		robots: {
			index: true,
			follow: true,
		},
		openGraph: {
			title,
			description: page.description,
			url: `${BASE_URL}${canonicalPath}`,
			type: "website",
			siteName: "CTEnvios",
			locale: "es_ES",
			images: [
				{
					url: DEFAULT_OG_IMAGE,
					width: 1200,
					height: 630,
					alt: "CTEnvios - Envíos a Cuba desde Miami",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description: page.description,
			images: [DEFAULT_OG_IMAGE],
		},
	};
}

