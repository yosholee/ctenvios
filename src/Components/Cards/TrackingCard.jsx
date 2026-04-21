import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { React } from "react";
import { TrackingHistoryCard } from "./TrackingHistoryCard";

export const TrackingCard = ({ parcel, invoice }) => {
	if (!parcel) return null;

	const orderOrInvoiceLabel = invoice?.invoiceId ?? invoice?.order_id ?? "";

	return (
		<div className="relative  z-10 -mx-4 shadow-lg ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-3xl  lg:flex-none">
			<div className="flex absolute -bottom-px left-1/2 -ml-48 h-[2px] w-96">
				<div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
				<div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
				<div className="-ml-[100%] w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
				<div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
			</div>
			<div className="relative flex flex-col lg:flex-row items-center gap-6 bg-white px-4 py-10 sm:rounded-3xl sm:px-10">
				<div>
					<div className="flex  gap-2 lg:gap-0 items-center justify-between">
						<h1 className="text-xl my-6">{invoice?.agency}</h1>
						<span className="inline-flex justify-center rounded-lg text-sm font-semibold py-2 px-3 border  bg-white/5  text-gray-700 ">
							<span className="flex items-center gap-2">
								<DocumentTextIcon className="h-6 w-6" />
								<span aria-hidden="true">{orderOrInvoiceLabel}</span>
							</span>
						</span>
					</div>
					<div className="text-sm text-gray-500">
						{invoice?.province} - {invoice?.city}
					</div>
					<div className="my-4 flex items-center">
						<p className="text-[1.5rem] leading-none text-slate-900">
							<span className="font-bold">{parcel?.hbl}</span>
						</p>
						<p className="ml-3 space-x-1 text-sm">
							<span className="font-semibold text-slate-900">HBL</span>
						</p>
					</div>
					<span className="text-slate-500 mt-4">{parcel?.description}</span>
				</div>
				<TrackingHistoryCard events={parcel?.events}  />
			</div>
		</div>
	);
};
