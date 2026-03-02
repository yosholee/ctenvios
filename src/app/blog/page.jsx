import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";

export const metadata = {
	title: "Blog de envíos a Cuba | CTEnvios",
	description:
		"Guías y respuestas sobre aduana, precios y tiempos de envíos a Cuba desde Miami.",
	keywords: [
		"blog envíos a cuba",
		"que se puede enviar a cuba",
		"impuestos aduana cuba",
		"cuanto cuesta enviar a cuba",
	],
	alternates: {
		canonical: "/blog",
	},
	openGraph: {
		title: "Blog de envíos a Cuba | CTEnvios",
		description: "Guías, precios, aduana y tiempos de envío a Cuba desde Miami.",
		url: "https://ctenvios.com/blog",
		type: "website",
		siteName: "CTEnvios",
		locale: "es_ES",
		images: [
			{
				url: "https://ctenvios.com/banner-discounts-compressed.jpg",
				width: 1200,
				height: 630,
				alt: "Blog CTEnvios",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Blog de envíos a Cuba | CTEnvios",
		description: "Resuelve dudas sobre aduana, costos y tiempos de envío a Cuba.",
		images: ["https://ctenvios.com/banner-discounts-compressed.jpg"],
	},
};

export default function BlogIndexPage() {
	const sortedPosts = [...blogPosts].sort(
		(a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
	);
	const blogSchema = {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: "Blog CTEnvios",
		description: "Guías y respuestas sobre aduana, precios y tiempos de envíos a Cuba desde Miami.",
		url: "https://ctenvios.com/blog",
		inLanguage: "es",
	};

	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Inicio", item: "https://ctenvios.com" },
			{ "@type": "ListItem", position: 2, name: "Blog", item: "https://ctenvios.com/blog" },
		],
	};

	return (
		<main className="mx-auto max-w-4xl px-4 py-24 sm:py-28 lg:py-32">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
			<header className="mb-10">
				<p className="text-sm font-semibold text-sky-700 uppercase tracking-wide">Blog CTEnvios</p>
				<h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
					Guías para envíos a Cuba desde Miami
				</h1>
				<p className="mt-4 text-lg text-gray-600">
					Contenido útil para resolver dudas de precios, aduana, tiempos y tracking.
				</p>
			</header>

			<section className="space-y-6">
				{sortedPosts.map((post) => (
					<article key={post.slug} className="rounded-xl border border-gray-200 p-5">
						<p className="text-sm text-gray-500">
							{post.publishedAt} · {post.readTime}
						</p>
						<h2 className="mt-2 text-xl font-semibold text-gray-900">{post.title}</h2>
						<p className="mt-2 text-gray-700">{post.description}</p>
						<Link
							href={`/blog/${post.slug}`}
							className="mt-4 inline-block text-sm font-semibold text-sky-700 hover:text-sky-800"
						>
							Leer artículo →
						</Link>
					</article>
				))}
			</section>
		</main>
	);
}
