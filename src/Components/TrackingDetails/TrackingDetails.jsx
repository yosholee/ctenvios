import { TrackingCard } from "../Cards/TrackingCard";

export const TrackingDetails = ({ invoice }) => {
	if (!invoice || Object.keys(invoice).length === 0) {
		return null;
	}

	const { parcels } = invoice;

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
