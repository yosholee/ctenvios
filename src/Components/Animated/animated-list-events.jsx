import { cn } from "@/lib/utils";
import { AnimatedList } from "../ui/animated-list";
import {
	CheckCircle,
	Container,
	FileIcon,
	ShieldAlert,
	TruckIcon,
	Warehouse,
	WarehouseIcon,
} from "lucide-react";

let events = [
	{
		name: "Facturado",
		description: "Miscelaneas",
		time: "Hace 15m minutos",
		icon: <FileIcon className="h-6 w-6" />,
		color: "#00C9A7",
	},
	{
		name: "En Almacen",
		description: "Recibido",
		time: "Hace 25m minutos",
		icon: <Warehouse className="h-6 w-6" />,
		color: "#FFB800",
	},
	{
		name: "En Contenedor",
		description: "Contenedor-2401",
		time: "Hace 2 días",
		icon: <Container className="h-6 w-6" />,
		color: "#FF3D71",
	},
	{
		name: "En Aduana",
		description: "Espera de Aduana",
		time: "Hace 4 días",
		icon: <ShieldAlert className="h-6 w-6" />,
		color: "#00C9A7",
	},
	{
		name: "Almacen Mypimes",
		description: "Listo para Traslado",
		time: "Hace 4 días",
		icon: <WarehouseIcon className="h-6 w-6" />,
		color: "#8095ff",
	},
	{
		name: "En Transito",
		description: "En Transito",
		time: "Hace 3 días",
		icon: <TruckIcon className="h-6 w-6" />,
		color: "#FFB800",
	},
	{
		name: "Entregado",
		description: "Entregado",
		time: "Hace 3 días",
		icon: <CheckCircle className="h-6 w-6" />,
		color: "#1E86FF",
	},
];

// Keep the list lightweight to reduce animation and rendering cost.
const extendedEvents = Array.from({ length: 4 }, () => events).flat();

const Notification = ({ name, description, icon, color, time }) => {
	return (
		<figure
			className={cn(
				"relative mx-auto min-h-fit w-full max-w-[400px] transform cursor-pointer overflow-hidden rounded-2xl p-4",
				// animation styles
				"transition-all duration-200 ease-in-out hover:scale-[103%]",
				// light styles
				"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				// dark styles
				"transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
			)}
		>
			<div className="flex flex-row items-center gap-3">
				<div
					className="flex h-10 w-10 items-center justify-center rounded-xl"
					style={{ backgroundColor: color }}
				>
					<span className="text-md text-white">{icon}</span>
				</div>
				<div className="flex flex-col overflow-hidden">
					<figcaption className="flex flex-row items-center whitespace-pre  font-medium dark:text-white ">
						<span className="sm:text-md text-sm">{name}</span>
						<span className="mx-1">·</span>
						<span className="text-xs text-gray-500">{time}</span>
					</figcaption>
					<p className="text-sm font-normal dark:text-white/60">{description}</p>
				</div>
			</div>
		</figure>
	);
};

export const AnimatedListEvents = ({ className }) => {
	return (
		<div className="relative flex h-[500px] w-full flex-col p-6 overflow-hidden l">
			<AnimatedList maxItems={7}>
				{extendedEvents.map((item, idx) => (
					<Notification {...item} key={idx} />
				))}
			</AnimatedList>
		</div>
	);
};
