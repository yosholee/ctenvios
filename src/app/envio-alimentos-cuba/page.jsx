import { ServicePageTemplate } from "@/Components/Seo/ServicePageTemplate";
import { servicePages } from "@/lib/servicePages";
import { notFound } from "next/navigation";

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
		canonical: "https://ctenvios.com/envio-alimentos-cuba",
	},
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		title: "Enviar alimentos a Cuba desde Miami",
		description: page.description,
		url: "https://ctenvios.com/envio-alimentos-cuba",
		type: "article",
	},
};

export default function EnvioAlimentosPage() {
	if (!page) {
		notFound();
	}

	return <ServicePageTemplate page={page} />;
}
