import { ServicePageTemplate } from "@/Components/Seo/ServicePageTemplate";
import { servicePages } from "@/lib/servicePages";
import { notFound } from "next/navigation";

const page = servicePages.find((item) => item.slug === "envio-electrodomesticos-cuba");

export const metadata = {
	title: "Enviar electrodomésticos a Cuba | CTEnvios",
	description: page.description,
	keywords: [
		"enviar electrodomésticos a cuba",
		"envio electrodomesticos cuba",
		"paquetería cuba miami",
		"envío puerta a puerta cuba",
	],
	alternates: {
		canonical: "https://ctenvios.com/envio-electrodomesticos-cuba",
	},
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		title: "Envío de electrodomésticos a Cuba",
		description: page.description,
		url: "https://ctenvios.com/envio-electrodomesticos-cuba",
		type: "article",
	},
};

export default function EnvioElectrodomesticosPage() {
	if (!page) {
		notFound();
	}

	return <ServicePageTemplate page={page} />;
}
