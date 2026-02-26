import { ServicePageTemplate } from "@/Components/Seo/ServicePageTemplate";
import { servicePages } from "@/lib/servicePages";

const page = servicePages.find((item) => item.slug === "envios-maritimos-cuba");

export const metadata = {
	title: "Envíos marítimos a Cuba desde Miami | CTEnvios",
	description: page.description,
	keywords: [
		"envíos marítimos a cuba",
		"paquetería cuba miami",
		"envío puerta a puerta cuba",
		"enviar paquete a cuba precio",
	],
	alternates: {
		canonical: "/envios-maritimos-cuba",
	},
	openGraph: {
		title: "Envíos marítimos a Cuba desde Miami",
		description: page.description,
		url: "https://ctenvios.com/envios-maritimos-cuba",
		type: "article",
	},
};

export default function EnviosMaritimosPage() {
	return <ServicePageTemplate page={page} />;
}
