import { ServicePageTemplate } from "@/Components/Seo/ServicePageTemplate";
import { buildServiceMetadata } from "@/lib/seo";
import { servicePages } from "@/lib/servicePages";
import { notFound } from "next/navigation";

const page = servicePages.find((item) => item.slug === "envios-aereos-cuba");

export const metadata = buildServiceMetadata({
	page,
	title: "Envíos aéreos a Cuba rápidos y seguros | CTEnvios",
	keywords: [
		"envíos aéreos a cuba",
		"envíos a cuba desde miami",
		"agencia envíos cuba miami",
		"enviar paquete a cuba precio",
	],
});

export default function EnviosAereosPage() {
	if (!page) {
		notFound();
	}

	return <ServicePageTemplate page={page} />;
}
