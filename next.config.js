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
};

module.exports = nextConfig;
