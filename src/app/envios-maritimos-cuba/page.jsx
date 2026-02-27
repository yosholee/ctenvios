import { ServicePageTemplate } from "@/Components/Seo/ServicePageTemplate";
import { servicePages } from "@/lib/servicePages";
import { notFound } from "next/navigation";

const page = servicePages.find((item) => item.slug === "envios-maritimos-cuba");

export const metadata = {
	title: "Envíos marítimos a Cuba desde Miami | CTEnvios",
	description:
		page?.description ||
		"Servicio de envíos marítimos a Cuba con tarifas por libra, entrega puerta a puerta y seguimiento de paquetes desde Miami.",
	keywords: [
		"envíos marítimos a cuba",
		"paquetería cuba miami",
		"envío puerta a puerta cuba",
		"enviar paquete a cuba precio",
	],
	alternates: {
		canonical: "https://ctenvios.com/envios-maritimos-cuba",
	},
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		title: "Envíos marítimos a Cuba desde Miami",
		description:
			page?.description ||
			"Servicio de envíos marítimos a Cuba con tarifas por libra, entrega puerta a puerta y seguimiento de paquetes desde Miami.",
		url: "https://ctenvios.com/envios-maritimos-cuba",
		type: "article",
	},
};

export default function EnviosMaritimosPage() {
	if (!page) {
		notFound();
	}

	return <ServicePageTemplate page={page} />;
}
