const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		qualities: [60, 65, 70, 75, 85],
	},
	turbopack: {
		root: path.join(__dirname),
	},
	allowedDevOrigins: [
		"http://10.1.10.200:3000",
		"http://10.1.10.200:3001",
	],
	async headers() {
		return [
			{
				// Hashed JS/CSS bundles — safe to cache forever
				source: "/_next/static/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				// Public images / icons
				source: "/:file(.*\\.(?:png|jpg|jpeg|webp|avif|gif|ico|svg))",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=2592000, stale-while-revalidate=86400",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
