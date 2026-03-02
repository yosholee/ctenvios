import Link from "next/link";
import { MapPinIcon } from "lucide-react";
import dynamic from "next/dynamic";
import ShimmerButton from "../../Components/ui/shimmer-button";

const AnimatedListEvents = dynamic(
	() => import("@/Components/Animated/animated-list-events").then((module) => module.AnimatedListEvents),
	{
		loading: () => <div className="h-[500px] w-full rounded-xl bg-white/60" aria-hidden="true" />,
	},
);

export const ShadowBg1 = () => {
	return (
		<div
			className="absolute inset-x-0 -top-40  -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
			aria-hidden="true"
		>
			<div
				className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[rgb(46,88,227)] to-[#0a82dec0] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
				style={{
					clipPath:
						"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
				}}
			/>
		</div>
	);
};

export const ShadowBg2 = () => {
	return (
		<div
			className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
			aria-hidden="true"
		>
			<div className="absolute inset-0 -z-10 overflow-hidden">
				<svg
					className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
					aria-hidden="true"
				>
					<defs>
						<pattern
							id="tracking-grid-top"
							width={200}
							height={200}
							x="50%"
							y={-1}
							patternUnits="userSpaceOnUse"
						>
							<path d="M100 200V.5M.5 .5H200" fill="none" />
						</pattern>
					</defs>
					<svg x="50%" y={-1} className="overflow-visible fill-blue-500">
						<path
							d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
							strokeWidth={0}
						/>
					</svg>
					<rect width="100%" height="100%" strokeWidth={0} fill="url(#tracking-grid-top)" />
				</svg>
			</div>
		</div>
	);
};

export default function TrackingSection() {
	return (
		
		<section className="relative overflow-x-hidden py-20 md:py-12">
			<div className="mx-auto sm:py-24 lg:py-32 lg:container lg:max-w-7xl ">
				<div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
					<div className=" relative mx-auto px-4 text-center  ">
						<div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
							<h2 className="text-base font-semibold leading-7 text-sky-600">
								Sistema de Tracking
							</h2>
							<p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
								Conozca en todo momento dónde se encuentra su envío
							</p>
						</div>

						{/* <SphereMask /> */}

						<ShimmerButton className=" mx-auto w-64 bg-gray-800 mt-8">
							<Link href="/tracking" className="inline-flex items-center gap-2">
								Tracking
								<MapPinIcon className="ml-1 size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
							</Link>
						</ShimmerButton>
					</div>

					<div className="relative h-full rounded-xl bg-white/30 backdrop-blur-md [content-visibility:auto] [contain-intrinsic-size:500px]">
						<div className="absolute inset-0 -z-10 overflow-hidden">
							<svg
								className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
								aria-hidden="true"
							>
								<defs>
									<pattern
										id="tracking-grid-panel"
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
								<rect width="100%" height="100%" strokeWidth={0} fill="url(#tracking-grid-panel)" />
							</svg>
						</div>
						<AnimatedListEvents />
					</div>
				</div>
			</div>
			<ShadowBg1 />
		</section>
		
	);
}
