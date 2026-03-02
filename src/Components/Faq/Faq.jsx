import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const faqSections = [
	{
		title: "Información General",
		faqs: [
			{
				title: "¿Qué tiempo demora un envío a Cuba?",
				content:
					"Generalmente, nuestros envíos de paquetes a Cuba tardan entre 30 y 45 días laborables. El tiempo de entrega varía según la provincia, con las provincias orientales siendo las que más tiempo requieren para la entrega.",
				value: "general-1",
			},
			{
				title: "¿Cuál es el peso máximo permitido para un paquete?",
				content:
					"El peso máximo permitido para un paquete es de 30 kg. Si su envío supera este peso, deberá dividirlo en varios paquetes para un envío seguro y eficiente.",
				value: "general-2",
			},
		],
	},
	{
		title: "Restricciones y Seguridad",
		faqs: [
			{
				title: "¿Qué artículos están prohibidos para enviar a Cuba?",
				content:
					"Está prohibido enviar artículos como drogas, armas, explosivos, materiales inflamables, animales vivos, dinero en efectivo y otros artículos ilegales o peligrosos. Consulte nuestra lista completa de artículos prohibidos antes de realizar su envío a Cuba.",
				value: "security-1",
			},
			{
				title: "¿Ofrecen seguro para los envíos a Cuba?",
				content:
					"Sí, ofrecemos opciones de seguro para sus envíos a Cuba. El costo del seguro varía según el valor declarado del contenido del paquete. Recomendamos asegurar todos los envíos de alto valor para su tranquilidad.",
				value: "security-2",
			},
		],
	},
	{
		title: "Seguimiento y Resolución de Problemas",
		faqs: [
			{
				title: "¿Cómo puedo rastrear mi paquete?",
				content:
					"Puede rastrear su paquete utilizando el número de seguimiento proporcionado al momento del envío. Ingrese este número en la sección de 'Tracking' de nuestra página web para obtener actualizaciones en tiempo real sobre su envío a Cuba.",
				value: "tracking-1",
			},
			{
				title: "¿Qué hago si mi paquete se pierde o se daña?",
				content:
					"En caso de pérdida o daño de su paquete, contáctenos inmediatamente. Tenemos un proceso de reclamación que debe iniciarse dentro de los 15 días posteriores a la fecha estimada de entrega. Guarde todos los recibos y documentación relacionada con su envío.",
				value: "tracking-2",
			},
		],
	},
];

export default function Faq() {
	return (
		<div id="faq" className="py-20 mx-4 sm:py-24 lg:py-32 items-center  grid lg:grid-cols-2 gap-10">
			<div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
				<h2 className="text-base font-semibold leading-7 text-sky-600">Preguntas Frecuentes</h2>
				<p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
				Somos tu agencia de envíos a Cuba y estamos aquí para ayudarte en cada paso.
				</p>
			</div>
			<div>
				{faqSections.map((section, sectionIndex) => (
					<div key={sectionIndex} className="mb-10">
						<h3 className=" cursor-pointer    text-base font-semibold leading-7 text-sky-700">
							{section.title}
						</h3>
						<Accordion type="single" collapsible>
							{section.faqs.map((faq, faqIndex) => (
								<AccordionItem key={faqIndex} value={faq.value}>
									<AccordionTrigger className="inline-flex text-left justify-between">
										{faq.title}
									</AccordionTrigger>
									<AccordionContent>{faq.content}</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				))}
			</div>
		</div>
	);
}
