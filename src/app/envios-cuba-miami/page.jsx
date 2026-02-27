import { ServicePageTemplate } from "@/Components/Seo/ServicePageTemplate";
import { servicePages } from "@/lib/servicePages";
import { notFound } from "next/navigation";

const page = servicePages.find((item) => item.slug === "envios-cuba-miami");

export const metadata = {
	title: "Agencia de envíos Cuba Miami (Hialeah) | CTEnvios",
	description:
		page?.description ||
		"CTEnvios, agencia de paquetería a Cuba en Hialeah, Miami. Envío puerta a puerta, tracking y cotización rápida.",
	keywords: [
		"agencia envíos cuba miami",
		"envíos a cuba desde miami",
		"envío barato cuba",
		"mejores agencias envios cuba",
	],
	alternates: {
		canonical: "https://ctenvios.com/envios-cuba-miami",
	},
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		title: "Agencia de envíos a Cuba en Hialeah, Miami",
		description:
			page?.description ||
			"CTEnvios, agencia de paquetería a Cuba en Hialeah, Miami. Envío puerta a puerta, tracking y cotización rápida.",
		url: "https://ctenvios.com/envios-cuba-miami",
		type: "article",
	},
};

export default function EnviosCubaMiamiPage() {
	if (!page) {
		notFound();
	}

	return <ServicePageTemplate page={page} />;
}
