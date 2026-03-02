"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/Components/ui/button";

export default function TermsContent() {
	const [language, setLanguage] = useState("es");

	const toggleLanguage = () => {
		setLanguage(language === "es" ? "en" : "es");
	};

	const content = {
		es: {
			title: "Términos y Condiciones",
			lastUpdated: "Última actualización",
			sections: [
				{
					title: "1. Introducción",
					content: [
						"Bienvenido a CT Envíos. Estos términos y condiciones rigen el uso de nuestros servicios de envío internacional a Cuba, incluyendo nuestro sitio web, aplicaciones móviles y todos los servicios relacionados.",
						"Al utilizar nuestros servicios, usted acepta estos términos y condiciones en su totalidad. Si no está de acuerdo en su totalidad con estos términos y condiciones o cualquier parte de los mismos, no debe utilizar nuestros servicios.",
					],
				},
				{
					title: "2. Servicios de Envío",
					content: [
						"CT Envíos ofrece servicios de logística internacional, especializados en envíos de cargas marítimas y aéreas a toda Cuba.",
						"Nos comprometemos a entregar sus paquetes hasta la puerta de su destinatario en Cuba, sujeto a las regulaciones aduaneras y restricciones aplicables.",
						"Los tiempos de entrega son estimados y pueden variar según factores externos como condiciones climáticas, procedimientos aduaneros, y situaciones fuera de nuestro control.",
					],
				},
				{
					title: "3. Tarifas y Pagos",
					content: [
						"Las tarifas de envío se calculan según el peso y/o volumen del paquete y el método de envío seleccionado (marítimo o aéreo).",
						"Todos los precios están sujetos a cambios sin previo aviso, aunque nos esforzamos por mantener las tarifas más competitivas del mercado.",
						"El pago debe realizarse por completo antes de que se procese el envío. Aceptamos múltiples métodos de pago que se detallan en nuestro proceso de checkout.",
					],
				},
				{
					title: "4. Artículos Prohibidos",
					content: [
						"Ciertos artículos están prohibidos para el envío a Cuba debido a regulaciones internacionales y leyes cubanas. Estos incluyen, pero no se limitan a:",
					],
					list: [
						"Armas, explosivos y municiones",
						"Drogas ilegales y narcóticos",
						"Material pornográfico",
						"Productos perecederos sin el embalaje adecuado",
						"Animales vivos",
						"Dinero en efectivo",
						"Artículos que violen las leyes de embargo",
					],
					afterList: [
						"El remitente es responsable de asegurar que el contenido del paquete, asi como la información brindada, no infringen las leyes de los Estados Unidos y Cuba. CT Envíos se reserva el derecho de inspeccionar los paquetes para verificar su contenido.",
					],
				},
				{
					title: "5. Seguimiento y Entrega",
					content: [
						"Proporcionamos un número de seguimiento para cada envío que permite rastrear el estado y ubicación de su paquete a través de nuestro sitio web o contactando a nuestro servicio al cliente.",
						"La entrega se realizará a la dirección proporcionada por el remitente. Es responsabilidad del remitente proporcionar información de contacto y dirección precisa y completa.",
						"En caso de que no se pueda realizar la entrega debido a información incorrecta o incompleta, se aplicarán cargos adicionales por reintento de entrega.",
					],
				},
				{
					title: "6. Seguro y Responsabilidad",
					content: [
						"Ofrecemos opciones de seguro para proteger sus envíos contra pérdida o daño. Recomendamos asegurar todos los envíos de valor.",
						"Sin seguro adicional, nuestra responsabilidad por pérdida o daño está limitada según lo establecido por las convenciones internacionales de transporte.",
						"CT Envíos no será responsable por retrasos causados por procedimientos aduaneros, condiciones climáticas, o cualquier otra circunstancia fuera de nuestro control razonable.",
					],
				},
				{
					title: "7. Reclamaciones",
					content: [
						"Las reclamaciones por daños o pérdidas deben presentarse dentro de los 30 días posteriores a la fecha de entrega programada.",
						"Para procesar una reclamación, se requerirá el número de seguimiento, prueba de valor y documentación que respalde la reclamación.",
						"Las reclamaciones serán evaluadas caso por caso y la compensación se determinará según nuestras políticas de seguro y responsabilidad.",
					],
				},
				{
					title: "8. Privacidad de Datos",
					content: [
						"Recopilamos y procesamos información personal necesaria para proporcionar nuestros servicios de envío, de acuerdo con nuestra Política de Privacidad.",
						"Al utilizar nuestros servicios, usted consiente la recopilación y uso de su información según lo descrito en nuestra Política de Privacidad.",
					],
				},
				{
					title: "9. Modificaciones",
					content: [
						"CT Envíos se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en nuestro sitio web.",
						"Es responsabilidad del usuario revisar periódicamente estos términos y condiciones para estar al tanto de cualquier cambio.",
					],
				},
				{
					title: "10. Ley Aplicable",
					content: [
						"Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de los Estados Unidos y el Estado de Florida, sin tener en cuenta sus disposiciones sobre conflictos de leyes.",
						"Cualquier disputa que surja en relación con estos términos será sometida a la jurisdicción exclusiva de los tribunales del Condado de Miami-Dade, Florida.",
					],
				},
				{
					title: "11. Contacto",
					content: ["Si tiene alguna pregunta sobre estos términos y condiciones, por favor contáctenos:"],
					contact: [
						"CTEnvios",
						"10230 NW 80th Ave. Hialeah Gardens",
						"Teléfono: 305-851-3004",
						"Email: soporte@ctenvios.com",
						"Whatsapp: +1 754 277 8810",
					],
				},
			],
			languageButton: "English",
		},
		en: {
			title: "Terms and Conditions",
			lastUpdated: "Last updated",
			sections: [
				{
					title: "1. Introduction",
					content: [
						"Welcome to CT Envíos. These terms and conditions govern the use of our international shipping services to Cuba, including our website, mobile applications, and all related services.",
						"By using our services, you agree to these terms and conditions in full. If you disagree with these terms and conditions or any part of them, you must not use our services.",
					],
				},
				{
					title: "2. Shipping Services",
					content: [
						"CT Envíos offers international logistics services, specializing in maritime and air cargo shipments to all of Cuba.",
						"We are committed to delivering your packages to your recipient's door in Cuba, subject to applicable customs regulations and restrictions.",
						"Delivery times are estimated and may vary according to external factors such as weather conditions, customs procedures, and situations beyond our control.",
					],
				},
				{
					title: "3. Rates and Payments",
					content: [
						"Shipping rates are calculated according to the weight and/or volume of the package and the selected shipping method (maritime or air).",
						"All prices are subject to change without notice, although we strive to maintain the most competitive rates in the market.",
						"Payment must be made in full before the shipment is processed. We accept multiple payment methods that are detailed in our checkout process.",
					],
				},
				{
					title: "4. Prohibited Items",
					content: [
						"Certain items are prohibited for shipment to Cuba due to international regulations and Cuban laws. These include, but are not limited to:",
					],
					list: [
						"Weapons, explosives, and ammunition",
						"Illegal drugs and narcotics",
						"Pornographic material",
						"Perishable products without proper packaging",
						"Live animals",
						"Cash",
						"Items that violate embargo laws",
					],
					afterList: [
						"The sender is responsible for ensuring that the package contents do not violate these restrictions. CT Envíos reserves the right to inspect packages to verify their contents.",
					],
				},
				{
					title: "5. Tracking and Delivery",
					content: [
						"We provide a tracking number for each shipment that allows you to track the status and location of your package through our website or by contacting our customer service.",
						"Delivery will be made to the address provided by the sender. It is the sender's responsibility to provide accurate and complete contact information and address.",
						"In the event that delivery cannot be made due to incorrect or incomplete information, additional charges will apply for redelivery attempts.",
					],
				},
				{
					title: "6. Insurance and Liability",
					content: [
						"We offer insurance options to protect your shipments against loss or damage. We recommend insuring all valuable shipments.",
						"Without additional insurance, our liability for loss or damage is limited as established by international transport conventions.",
						"CT Envíos will not be responsible for delays caused by customs procedures, weather conditions, or any other circumstance beyond our reasonable control.",
					],
				},
				{
					title: "7. Claims",
					content: [
						"Claims for damages or losses must be submitted within 30 days of the scheduled delivery date.",
						"To process a claim, the tracking number, proof of value, and documentation supporting the claim will be required.",
						"Claims will be evaluated on a case-by-case basis, and compensation will be determined according to our insurance and liability policies.",
					],
				},
				{
					title: "8. Data Privacy",
					content: [
						"We collect and process personal information necessary to provide our shipping services, in accordance with our Privacy Policy.",
						"By using our services, you consent to the collection and use of your information as described in our Privacy Policy.",
					],
				},
				{
					title: "9. Modifications",
					content: [
						"CT Envíos reserves the right to modify these terms and conditions at any time. Modifications will take effect immediately after their publication on our website.",
						"It is the user's responsibility to periodically review these terms and conditions to be aware of any changes.",
					],
				},
				{
					title: "10. Applicable Law",
					content: [
						"These terms and conditions will be governed and interpreted in accordance with the laws of the United States and the State of Florida, regardless of its conflict of law provisions.",
						"Any dispute arising in connection with these terms will be subject to the exclusive jurisdiction of the courts of Miami-Dade County, Florida.",
					],
				},
				{
					title: "11. Contact",
					content: ["If you have any questions about these terms and conditions, please contact us:"],
					contact: [
						"CTEnvios",
						"10230 NW 80th Ave. Hialeah Gardens",
						"Phone: 305-851-3004",
						"Email: soporte@ctenvios.com",
					],
				},
			],
			languageButton: "Español",
		},
	};

	const currentContent = language === "es" ? content.es : content.en;

	return (
		<main className="container mx-auto max-w-4xl px-4 py-8">
			<div className="mt-6 flex items-center justify-between">
				<h1 className="text-xl font-bold text-gray-900">{currentContent.title}</h1>
				<Button onClick={toggleLanguage} variant="ghost" className="flex items-center gap-2">
					<Globe className="h-4 w-4" />
					{currentContent.languageButton}
				</Button>
			</div>

			<div className="mb-8 p-6">
				<p className="mb-6 text-gray-600">
					{currentContent.lastUpdated}: {new Date().toLocaleDateString()}
				</p>

				{currentContent.sections.map((section, index) => (
					<section key={index} className="mb-8 text-sm">
						<h2 className="mb-4 text-md font-semibold text-gray-800">{section.title}</h2>
						{section.content.map((paragraph, pIndex) => (
							<p key={pIndex} className="mb-3 text-gray-700">
								{paragraph}
							</p>
						))}
						{section.list && (
							<ul className="mb-3 list-disc pl-6 text-gray-700">
								{section.list.map((item, lIndex) => (
									<li key={lIndex}>{item}</li>
								))}
							</ul>
						)}
						{section.afterList &&
							section.afterList.map((paragraph, aIndex) => (
								<p key={aIndex} className="mb-3 text-gray-700">
									{paragraph}
								</p>
							))}
						{section.contact && (
							<div className="text-gray-700">
								{section.contact.map((line, cIndex) => (
									<p key={cIndex}>{line}</p>
								))}
							</div>
						)}
					</section>
				))}
			</div>
		</main>
	);
}

