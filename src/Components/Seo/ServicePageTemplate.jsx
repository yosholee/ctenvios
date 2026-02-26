import Link from "next/link";
import { FaqJsonLd } from "./FaqJsonLd";

export function ServicePageTemplate({ page }) {
	return (
		<main className="mx-auto max-w-4xl px-4 py-24 sm:py-28 lg:py-32">
			<FaqJsonLd faqs={page.faqs} />

			<header className="mb-12">
				<p className="text-sm font-semibold text-sky-700 uppercase tracking-wide">{page.keyword}</p>
				<h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">{page.title}</h1>
				<p className="mt-4 text-lg text-gray-600">{page.intro}</p>
			</header>

			<section className="mb-10">
				<h2 className="text-2xl font-semibold text-gray-900">Precios y cotización</h2>
				<p className="mt-3 text-gray-700">{page.priceInfo}</p>
			</section>

			<section className="mb-10">
				<h2 className="text-2xl font-semibold text-gray-900">Tiempos de entrega</h2>
				<p className="mt-3 text-gray-700">{page.timeInfo}</p>
			</section>

			<section className="mb-10">
				<h2 className="text-2xl font-semibold text-gray-900">Ventajas de CTEnvios</h2>
				<ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
					{page.benefits.map((benefit) => (
						<li key={benefit}>{benefit}</li>
					))}
				</ul>
			</section>

			<section className="mb-12">
				<h2 className="text-2xl font-semibold text-gray-900">Preguntas frecuentes</h2>
				<div className="mt-4 space-y-5">
					{page.faqs.map((faq) => (
						<article key={faq.question}>
							<h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
							<p className="mt-1 text-gray-700">{faq.answer}</p>
						</article>
					))}
				</div>
			</section>

			<section className="rounded-xl bg-sky-50 p-6">
				<h2 className="text-xl font-semibold text-gray-900">Cotiza tu envío por WhatsApp</h2>
				<p className="mt-2 text-gray-700">
					Recibe precio, tiempo estimado y recomendaciones para tu paquete en minutos.
				</p>
				<div className="mt-4 flex flex-wrap gap-4">
					<Link
						href="https://api.whatsapp.com/send?phone=%2B17542778810"
						target="_blank"
						rel="noopener noreferrer"
						className="rounded-md bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-600"
					>
						Escribir por WhatsApp
					</Link>
					<Link
						href="/tracking"
						className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-800 hover:bg-white"
					>
						Rastrear envío
					</Link>
				</div>
			</section>
		</main>
	);
}
