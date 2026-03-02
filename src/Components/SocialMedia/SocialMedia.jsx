import { React } from "react";
export const SocialMedia = () => {
	return (
		<div className=" py-20 sm:py-24 lg:py-32 mx-4">
			<div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
				<h2 className="text-base font-semibold leading-7 text-sky-600">Nuestras Redes Sociales</h2>
				<p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
				Comienza a seguirnos y únete a la comunidad CTEnvíos.
				</p>
				<p className="mt-4 text-base text-gray-700 sm:text-lg">
				Mantente informado sobre nuestras ofertas, novedades y consejos para enviar paquetes a Cuba de forma segura y rápida.
				</p>
			</div>
			<div className=" items-center mt-10  z-20 justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
				<a
					href="https://www.facebook.com/people/CTEnvios/100087529462450/"
					target="_blank"
					rel="noopener noreferrer"
					className="w-full sm:w-auto border focus:ring-4 focus:outline-none bg- focus:ring-gray-300 text-gray-800 rounded-lg inline-flex items-center justify-center px-4 py-2.5 "
				>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 448 512"
						className="mx-4 text-5xl text-blue-600"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
					</svg>
					<div className="text-left">
						<div className="mb-1 ">Unete a nuesta familia en</div>
						<div className="-mt-1  text-blue-500  font-semibold">Facebook</div>
					</div>
				</a>
				<a
					href="https://www.instagram.com/ctenvios/"
					target="_blank"
					rel="noopener noreferrer"
					className="w-full sm:w-auto border focus:ring-4 focus:outline-none bg-gray-50 focus:ring-gray-300 text-gray-800 rounded-lg inline-flex items-center justify-center px-4 py-2.5 "
				>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 448 512"
						className="mx-4 text-5xl text-pink-500"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
					</svg>
					<div className="text-left">
						<div className="mb-1 ">Siguenos en Instagram</div>
						<div className="-mt-1  text-pink-500  font-semibold">Instagram</div>
					</div>
				</a>
			</div>
		</div>
	);
};
