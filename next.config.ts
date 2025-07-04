import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [new URL('https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/**')],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"]
		});
		return config;
	}
};

export default nextConfig;
