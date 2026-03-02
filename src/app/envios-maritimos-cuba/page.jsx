import { ServicePageTemplate } from "@/Components/Seo/ServicePageTemplate";
import { buildServiceMetadata } from "@/lib/seo";
import { servicePages } from "@/lib/servicePages";
import { notFound } from "next/navigation";

const page = servicePages.find((item) => item.slug === "envios-maritimos-cuba");

export const metadata = buildServiceMetadata({
	page,
	title: "Envíos marítimos a Cuba desde Miami | CTEnvios",
	keywords: [
		"envíos marítimos a cuba",
		"paquetería cuba miami",
		"envío puerta a puerta cuba",
		"enviar paquete a cuba precio",
		"agencia de envios a cuba",
		"agencia de envios a cuba desde miami",
		"agencia de envios hialeah"
	],
});

export default function EnviosMaritimosPage() {
	if (!page) {
		notFound();
	}

	return <ServicePageTemplate page={page} />;
}
