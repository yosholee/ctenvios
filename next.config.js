/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		qualities: [70, 75, 85],
	},
};

module.exports = nextConfig;
