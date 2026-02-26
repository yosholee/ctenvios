import { blogPosts } from "@/lib/blogPosts";
import { servicePages } from "@/lib/servicePages";

const baseUrl = "https://ctenvios.com";

export default function sitemap() {
	const staticPages = [
		{ url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
		{ url: `${baseUrl}/tracking`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
		{ url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
		{ url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
	];

	const serviceUrls = servicePages.map((page) => ({
		url: `${baseUrl}/${page.slug}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: 0.85,
	}));

	const blogUrls = blogPosts.map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: new Date(post.publishedAt),
		changeFrequency: "monthly",
		priority: 0.75,
	}));

	return [...staticPages, ...serviceUrls, ...blogUrls];
}
