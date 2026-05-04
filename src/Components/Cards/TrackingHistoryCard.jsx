import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CheckIcon, TruckIcon } from "@heroicons/react/24/outline";
import {
	dedupeTrackingEventsForDisplay,
	getTrackingEventPresentation,
} from "@/Utils/trackingEventLabels";

const getEventIcon = (statusCode) => {
	if (statusCode === "DELIVERED") {
		return <TruckIcon className="w-6 h-6 text-green-500 shrink-0" aria-hidden />;
	}
	return <CheckIcon className="w-6 h-6 text-[#0EA5E9] shrink-0" aria-hidden />;
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
	const displayEvents = dedupeTrackingEventsForDisplay(events);
	const hasEvents = displayEvents.length > 0;

	return (
		<div className="flex flex-col w-full">
			{hasEvents ? (
				<ul className="space-y-8 lg:border-l border-slate-900/10 pl-4 text-sm leading-6 text-slate-700">
					{displayEvents
						.slice()
						.reverse()
						.map((event, index) => {
							const pres = getTrackingEventPresentation(event);
							const dateLine = formatEventDate(event.timestamp);
							const secondaryHtml = pres.detail || pres.locationHtml;
							return (
								<li
									key={`${event.timestamp}-${pres.statusCode}-${index}`}
									className="flex items-start"
								>
									{getEventIcon(pres.statusCode)}
									<div className="ml-5 flex flex-col min-w-0">
										<strong
											className={`font-semibold text-slate-900 ${
												pres.statusCode === "DELIVERED" ? "text-green-600" : ""
											}`}
										>
											{pres.primary}
										</strong>
										{pres.contextLine && (
											<span className="text-xs text-slate-600 mt-0.5">{pres.contextLine}</span>
										)}
										{secondaryHtml ? (
											<span
												className="text-xs text-slate-600 mt-1 [&_strong]:font-semibold leading-relaxed"
												// HM/API copy is trusted; only &lt;strong&gt; and &lt;br /&gt; pass sanitizeTrustedTrackingHtml
												dangerouslySetInnerHTML={{ __html: secondaryHtml }}
											/>
										) : null}
										{dateLine ? (
											<span className="text-xs text-[#0EA5E9] mt-1">{dateLine}</span>
										) : null}
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
