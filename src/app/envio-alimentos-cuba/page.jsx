import { ServicePageTemplate } from "@/Components/Seo/ServicePageTemplate";
import { buildServiceMetadata } from "@/lib/seo";
import { servicePages } from "@/lib/servicePages";
import { notFound } from "next/navigation";

const page = servicePages.find((item) => item.slug === "envio-alimentos-cuba");

export const metadata = buildServiceMetadata({
	page,
	title: "Enviar alimentos a Cuba desde Miami | CTEnvios",
	keywords: [
		"enviar comida a cuba",
		"envio comida cuba miami",
		"aduana cuba alimentos limite",
		"envíos a cuba",
	],
});

export default function EnvioAlimentosPage() {
	if (!page) {
		notFound();
	}

	return <ServicePageTemplate page={page} />;
}
