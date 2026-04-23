import React from "react";
import { TrackingCard } from "../Cards/TrackingCard";

export const TrackingDetails = ({ invoice }) => {
	// Early return if invoice is falsy or empty
	if (!invoice || Object.keys(invoice).length === 0) {
		<p></p>
	}

	const { parcels } = invoice;

	// Early return if parcels is falsy or empty
	if (!parcels || parcels.length === 0) {
		return null;
	}

	return (
		<div className="flex flex-col mt-4 gap-4 max-w-2xl mx-auto">
			{parcels.map((parcel, index) => (
				<TrackingCard key={`parcel-${index}`} parcel={parcel} invoice={invoice} />
			))}
		</div>
	);
};
