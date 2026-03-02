import { ClockIcon, HomeIcon, ShieldCheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export const TrackingContent = () => {
	return (
		<div className="relative isolate overflow-hidden bg-white px-6  py-20 sm:py-24 lg:py-32 lg:overflow-visible lg:px-0">
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<svg
					className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
					aria-hidden="true"
				>
					<defs>
						<pattern
							id="e813992c-7d03-4cc4-a2bd-151760b470a0"
							width={200}
							height={200}
							x="50%"
							y={-1}
							patternUnits="userSpaceOnUse"
						>
							<path d="M100 200V.5M.5 .5H200" fill="none" />
						</pattern>
					</defs>
					<svg x="50%" y={-1} className="overflow-visible fill-gray-50">
						<path
							d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
							strokeWidth={0}
						/>
					</svg>
					<rect
						width="100%"
						height="100%"
						strokeWidth={0}
						fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
					/>
				</svg>
			</div>
			<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
				<div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
					<div className="lg:pr-4">
						<div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
							<h2 className="text-base font-semibold leading-7 text-sky-600">
								Envíe Rápido y Seguro
							</h2>
							<p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
								CTEnvíos a Cuba y el Caribe
							</p>
						</div>
					</div>
				</div>
				<div className="mt-2 w-full px-0 sm:-ml-12 sm:-mt-12 sm:p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
					<Image
						src="/ship2.jpg"
						className="h-auto w-full max-w-full rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] sm:max-w-none lg:w-[48rem]"
						height={1200}
						width={1600}
						loading="lazy"
						priority={false}
						sizes="(min-width: 1280px) 912px, (min-width: 1024px) 50vw, 100vw"
						quality={85}
						alt="Barco de carga transportando contenedores para envíos a Cuba"
					/>
				</div>
				<div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
					<div className="lg:pr-4">
						<div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
							<p>
							Nos enorgullece ofrecer envíos de paquetes rápidos y seguros a Cuba desde cualquier parte del mundo. Nuestra experiencia y compromiso se reflejan en tarifas competitivas, atención personalizada y un servicio de calidad. Desde la aduana hasta la entrega final, gestionamos cada paso para que tu envío a Cuba sea eficiente y sin complicaciones.
							</p>
							<ul role="list" className="mt-8 space-y-8 text-gray-600">
								<li className="flex gap-x-3">
									<HomeIcon className="mt-1 h-5 w-5 flex-none text-sky-600" aria-hidden="true" />
									<span>
										<strong className="font-semibold text-gray-900">Entregas Puerta a Puerta.</strong>{" "}
										Todos los paquetes serán entregados directamente en la puerta de tu casa o la de tu familiar en Cuba.
									</span>
								</li>
								<li className="flex gap-x-3">
									<ClockIcon className="mt-1 h-5 w-5 flex-none text-sky-600" aria-hidden="true" />
									<span>
										<strong className="font-semibold text-gray-900">
											Información en tiempo real.
										</strong>{" "}
										Rastrea tu envío de paquetes a Cuba fácilmente desde tu celular o computadora con nuestro sistema de tracking.
									</span>
								</li>
								<li className="flex gap-x-3">
									<ShieldCheckIcon
										className="mt-1 h-5 w-5 flex-none text-sky-600"
										aria-hidden="true"
									/>
									<span>
										<strong className="font-semibold text-gray-900">Garantía y Seguridad.</strong>{" "}
										Con CTEnvíos, todos tus envíos están asegurados y protegidos. Tu tranquilidad es nuestra prioridad.
									</span>
								</li>
							</ul>
							<p className="mt-8">
								En nuestra agencia de envíos, cada paquete que enviamos a Cuba representa un compromiso de seguridad, rapidez y atención personalizada. Gracias por elegirnos para cuidar lo que más importa.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
