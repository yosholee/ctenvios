import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts, blogPostSlugs } from "@/lib/blogPosts";

export function generateStaticParams() {
	return blogPostSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const post = blogPosts.find((item) => item.slug === slug);
	if (!post) {
		return {};
	}

	return {
		title: `${post.title} | CTEnvios`,
		description: post.description,
		keywords: [post.primaryKeyword, "envíos a cuba", "envíos a cuba desde miami", "agencia envíos cuba miami"],
		alternates: {
			canonical: `/blog/${post.slug}`,
		},
		openGraph: {
			title: post.title,
			description: post.description,
			url: `https://ctenvios.com/blog/${post.slug}`,
			type: "article",
			images: [
				{
					url: `https://ctenvios.com${post.image}`,
					alt: post.imageAlt,
				},
			],
		},
	};
}

export default async function BlogPostPage({ params }) {
	const { slug } = await params;
	const post = blogPosts.find((item) => item.slug === slug);
	if (!post) {
		notFound();
	}

	const articleSchema = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: post.title,
		description: post.description,
		datePublished: post.publishedAt,
		dateModified: post.publishedAt,
		author: {
			"@type": "Organization",
			name: "CTEnvios",
		},
		publisher: {
			"@type": "Organization",
			name: "CTEnvios",
			logo: {
				"@type": "ImageObject",
				url: "https://ctenvios.com/ctelogo.png",
			},
		},
		mainEntityOfPage: `https://ctenvios.com/blog/${post.slug}`,
		image: `https://ctenvios.com${post.image}`,
	};

	return (
		<main className="mx-auto max-w-3xl px-4 py-24 sm:py-28 lg:py-32">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

			<Link href="/blog" className="text-sm font-semibold text-sky-700 hover:text-sky-800">
				← Volver al blog
			</Link>

			<article className="mt-6">
				<p className="text-sm text-gray-500">
					{post.publishedAt} · {post.readTime}
				</p>
				<h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">{post.title}</h1>
				<p className="mt-4 text-lg text-gray-700">{post.description}</p>
				<div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
					<Image
						src={post.image}
						alt={post.imageAlt}
						width={1200}
						height={630}
						className="h-auto w-full object-cover"
						quality={65}
						sizes="(max-width: 768px) 100vw, 768px"
					/>
				</div>

				<div className="mt-8 space-y-4 text-gray-800">
					{post.content.map((paragraph) => (
						<p key={paragraph}>{paragraph}</p>
					))}
				</div>
			</article>

			<section className="mt-12 rounded-xl bg-sky-50 p-6">
				<h2 className="text-xl font-semibold text-gray-900">¿Listo para enviar a Cuba?</h2>
				<p className="mt-2 text-gray-700">Cotiza tu envío por WhatsApp y recibe atención personalizada.</p>
				<Link
					href="https://api.whatsapp.com/send?phone=%2B17542778810"
					target="_blank"
					rel="noopener noreferrer"
					className="mt-4 inline-block rounded-md bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-600"
				>
					Cotizar por WhatsApp
				</Link>
			</section>
		</main>
	);
}
