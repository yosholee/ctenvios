import { ServicePageTemplate } from "@/Components/Seo/ServicePageTemplate";
import { servicePages } from "@/lib/servicePages";
import { notFound } from "next/navigation";

const page = servicePages.find((item) => item.slug === "envios-aereos-cuba");

export const metadata = {
	title: "Envíos aéreos a Cuba rápidos y seguros | CTEnvios",
	description: page.description,
	keywords: [
		"envíos aéreos a cuba",
		"envíos a cuba desde miami",
		"agencia envíos cuba miami",
		"enviar paquete a cuba precio",
	],
	alternates: {
		canonical: "https://ctenvios.com/envios-aereos-cuba",
	},
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		title: "Envíos aéreos a Cuba con entrega rápida",
		description: page.description,
		url: "https://ctenvios.com/envios-aereos-cuba",
		type: "article",
	},
};

export default function EnviosAereosPage() {
	if (!page) {
		notFound();
	}

	return <ServicePageTemplate page={page} />;
}
