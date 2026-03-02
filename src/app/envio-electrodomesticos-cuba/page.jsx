import { ServicePageTemplate } from "@/Components/Seo/ServicePageTemplate";
import { buildServiceMetadata } from "@/lib/seo";
import { servicePages } from "@/lib/servicePages";
import { notFound } from "next/navigation";

const page = servicePages.find((item) => item.slug === "envio-electrodomesticos-cuba");

export const metadata = buildServiceMetadata({
	page,
	title: "Enviar electrodomésticos a Cuba | CTEnvios",
	keywords: [
		"enviar electrodomésticos a cuba",
		"envio electrodomesticos cuba",
		"paquetería cuba miami",
		"envío puerta a puerta cuba",
	],
});

export default function EnvioElectrodomesticosPage() {
	if (!page) {
		notFound();
	}

	return <ServicePageTemplate page={page} />;
}
