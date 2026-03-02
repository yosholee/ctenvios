import TermsContent from "@/Components/Terms/TermsContent";

export const metadata = {
	title: "Términos y Condiciones | CTEnvios",
	description:
		"Consulta los términos y condiciones de CTEnvios para envíos marítimos y aéreos a Cuba, políticas de responsabilidad, reclamaciones y contacto.",
	alternates: {
		canonical: "/terms",
	},
	openGraph: {
		title: "Términos y Condiciones | CTEnvios",
		description:
			"Políticas y condiciones de servicio para envíos a Cuba: tarifas, tiempos, artículos permitidos y reclamaciones.",
		url: "https://ctenvios.com/terms",
		type: "article",
		siteName: "CTEnvios",
		locale: "es_ES",
	},
	twitter: {
		card: "summary",
		title: "Términos y Condiciones | CTEnvios",
		description: "Revisa las políticas de envío, responsabilidad y reclamaciones de CTEnvios.",
	},
};

export default function TermsAndConditionsPage() {
	return <TermsContent />;
}
