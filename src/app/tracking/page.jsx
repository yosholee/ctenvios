import { Suspense } from "react";
import { HeroTracking } from "@/Components/Hero/HeroTracking";
import { TrackingContent } from "@/Components/Content/TrackingContent";
import { Stats } from "@/Components/Stats/Stats";
import { Loader2Icon } from "lucide-react";

export const metadata = {
	title: "Rastrear Envío a Cuba - Tracking de Paquetes | CTEnvios",
	description:
		"Rastrea tu paquete enviado a Cuba en tiempo real. Ingresa tu número de tracking para ver el estado actual de tu envío. Seguimiento de envíos marítimos y aéreos a Cuba.",
	keywords: [
		"Rastrear paquete Cuba",
		"Tracking envío Cuba",
		"Seguimiento de paquetes a Cuba",
		"Estado de envío a Cuba",
		"Número de tracking Cuba",
		"Localizar paquete Cuba",
	],
	alternates: {
		canonical: "/tracking",
	},
	openGraph: {
		title: "Rastrear Envío a Cuba - CTEnvios Tracking",
		description:
			"Rastrea tu paquete a Cuba en tiempo real. Ingresa tu número de seguimiento para ver actualizaciones.",
		url: "https://ctenvios.com/tracking",
		siteName: "CTEnvios",
		locale: "es_ES",
		type: "website",
		images: [
			{
				url: "https://ctenvios.com/banner-discounts-compressed.jpg",
				width: 1200,
				height: 630,
				alt: "Tracking de envíos a Cuba con CTEnvios",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Rastrear Envío a Cuba - CTEnvios Tracking",
		description: "Consulta el estado de tu envío en tiempo real con tu número de tracking.",
		images: ["https://ctenvios.com/banner-discounts-compressed.jpg"],
	},
};


const LoadingFallback = ({ height }) => (
	<div className={`flex justify-center items-center ${height}`}>
		<div className="animate-spin">
			<Loader2Icon className="w-12 h-12 text-gray-900" />
		</div>
	</div>
);

const Tracking = () => {
	return (
		<>
			<Suspense fallback={<LoadingFallback height="h-80" />}>
				<HeroTracking />
			</Suspense>
			<Stats />
			<TrackingContent />
		</>
	);
};

export default Tracking;
