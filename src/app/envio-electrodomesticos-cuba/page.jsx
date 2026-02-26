import { ServicePageTemplate } from "@/Components/Seo/ServicePageTemplate";
import { servicePages } from "@/lib/servicePages";

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
		canonical: "/envio-electrodomesticos-cuba",
	},
	openGraph: {
		title: "Envío de electrodomésticos a Cuba",
		description: page.description,
		url: "https://ctenvios.com/envio-electrodomesticos-cuba",
		type: "article",
	},
};

export default function EnvioElectrodomesticosPage() {
	return <ServicePageTemplate page={page} />;
}
