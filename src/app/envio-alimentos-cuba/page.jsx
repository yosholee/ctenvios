import { ServicePageTemplate } from "@/Components/Seo/ServicePageTemplate";
import { servicePages } from "@/lib/servicePages";

const page = servicePages.find((item) => item.slug === "envio-alimentos-cuba");

export const metadata = {
	title: "Enviar alimentos a Cuba desde Miami | CTEnvios",
	description: page.description,
	keywords: [
		"enviar comida a cuba",
		"envio comida cuba miami",
		"aduana cuba alimentos limite",
		"envíos a cuba",
	],
	alternates: {
		canonical: "/envio-alimentos-cuba",
	},
	openGraph: {
		title: "Enviar alimentos a Cuba desde Miami",
		description: page.description,
		url: "https://ctenvios.com/envio-alimentos-cuba",
		type: "article",
	},
};

export default function EnvioAlimentosPage() {
	return <ServicePageTemplate page={page} />;
}
