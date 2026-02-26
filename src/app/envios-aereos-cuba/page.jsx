import { ServicePageTemplate } from "@/Components/Seo/ServicePageTemplate";
import { servicePages } from "@/lib/servicePages";

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
		canonical: "/envios-aereos-cuba",
	},
	openGraph: {
		title: "Envíos aéreos a Cuba con entrega rápida",
		description: page.description,
		url: "https://ctenvios.com/envios-aereos-cuba",
		type: "article",
	},
};

export default function EnviosAereosPage() {
	return <ServicePageTemplate page={page} />;
}
