import { ServicePageTemplate } from "@/Components/Seo/ServicePageTemplate";
import { buildServiceMetadata } from "@/lib/seo";
import { servicePages } from "@/lib/servicePages";
import { notFound } from "next/navigation";

const page = servicePages.find((item) => item.slug === "envios-cuba-miami");

export const metadata = buildServiceMetadata({
	page,
	title: "Agencia de envíos Cuba Miami (Hialeah) | CTEnvios",
	keywords: [
		"agencia envíos cuba miami",
		"envíos a cuba desde miami",
		"envío barato cuba",
		"mejores agencias envios cuba",
	],
});

export default function EnviosCubaMiamiPage() {
	if (!page) {
		notFound();
	}

	return <ServicePageTemplate page={page} />;
}
