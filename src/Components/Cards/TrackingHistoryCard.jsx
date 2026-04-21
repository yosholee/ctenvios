import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CheckIcon, TruckIcon } from "@heroicons/react/24/outline";
import {
	dedupeTrackingEventsForDisplay,
	getTrackingEventPresentation,
} from "@/Utils/trackingEventLabels";

const getEventIcon = (statusCode) => {
	if (statusCode === "DELIVERED") {
		return <TruckIcon className="w-6 h-6 text-green-500" />;
	}
	return <CheckIcon className="w-6 h-6 text-[#0EA5E9]" />;
};

const formatEventDate = (timestamp) => {
	if (!timestamp || timestamp === "0000-00-00") return "";

	try {
		const date = parseISO(timestamp);
		if (isNaN(date.getTime())) return "";
		return format(date, "d MMM yyyy, HH:mm", { locale: es });
	} catch {
		return "";
	}
};

export const TrackingHistoryCard = ({ events }) => {
	const displayEvents =
		events && events.length > 0 ? dedupeTrackingEventsForDisplay(events) : [];
	const hasEvents = displayEvents.length > 0;

	return (
		<div className="flex flex-col w-full">
			{hasEvents ? (
				<ul className="space-y-8 lg:border-l border-slate-900/10 pl-4 text-sm leading-6 text-slate-700">
					{[...displayEvents].reverse().map((event, index) => {
						const line = getTrackingEventPresentation(event);
						return (
							<li key={index} className="flex items-start">
								{getEventIcon(line.statusCode)}
								<div className="ml-5 flex flex-col gap-0.5">
									<strong
										className={`font-semibold ${line.statusCode === "DELIVERED"
												? "text-green-600"
												: "text-slate-900"
											}`}
									>
										{line.primary}
									</strong>
									{line.contextLine && (
										<span className="text-xs font-medium text-slate-600">{line.contextLine}</span>
									)}
									
									{line.location && (
										<span className="text-xs text-slate-600">{line.location}</span>
									)}
									{formatEventDate(event.timestamp) && (
										<span className="text-xs text-[#0EA5E9] mt-1">
											{formatEventDate(event.timestamp)}
										</span>
									)}
								</div>
							</li>
						);
					})}
				</ul>
			) : (
				<div className="text-sm text-slate-500 py-4">No hay eventos disponibles</div>
			)}
		</div>
	);
};
