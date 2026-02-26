import { ServicePageTemplate } from "@/Components/Seo/ServicePageTemplate";
import { servicePages } from "@/lib/servicePages";

const page = servicePages.find((item) => item.slug === "envios-cuba-miami");

export const metadata = {
	title: "Agencia de envíos Cuba Miami (Hialeah) | CTEnvios",
	description: page.description,
	keywords: [
		"agencia envíos cuba miami",
		"envíos a cuba desde miami",
		"envío barato cuba",
		"mejores agencias envios cuba",
	],
	alternates: {
		canonical: "/envios-cuba-miami",
	},
	openGraph: {
		title: "Agencia de envíos a Cuba en Hialeah, Miami",
		description: page.description,
		url: "https://ctenvios.com/envios-cuba-miami",
		type: "article",
	},
};

export default function EnviosCubaMiamiPage() {
	return <ServicePageTemplate page={page} />;
}
