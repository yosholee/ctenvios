// LocalBusiness Schema
const localBusinessSchema = {
	"@context": "https://schema.org",
	"@type": "LocalBusiness",
	"@id": "https://ctenvios.com/#business",
	name: "CTEnvios",
	alternateName: "CTEnvíos",
	description:
		"CTEnvios ofrece servicios de envío a Cuba seguros y económicos. Envía paquetes, remesas, alimentos y más a tus seres queridos en Cuba con garantía y rapidez.",
	url: "https://ctenvios.com",
	telephone: "+1-754-277-8810",
	priceRange: "$$",
	image: "https://ctenvios.com/ctelogo.png",
	address: {
		"@type": "PostalAddress",
		streetAddress: "Hialeah",
		addressLocality: "Hialeah",
		addressRegion: "FL",
		postalCode: "33012",
		addressCountry: "US",
	},
	geo: {
		"@type": "GeoCoordinates",
		latitude: 25.8576,
		longitude: -80.2781,
	},
	openingHoursSpecification: [
		{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			opens: "09:00",
			closes: "18:00",
		},
		{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: "Saturday",
			opens: "09:00",
			closes: "14:00",
		},
	],
	sameAs: [
		"https://www.facebook.com/people/CTEnvios/100087529462450/",
		"https://www.instagram.com/ctenvios/",
	],
	areaServed: [
		{
			"@type": "Country",
			name: "Cuba",
		},
		{
			"@type": "Country",
			name: "United States",
		},
	],
	serviceType: ["Envíos a Cuba", "Paquetes a Cuba", "Envío marítimo", "Envío aéreo"],
};

// Organization Schema
const organizationSchema = {
	"@context": "https://schema.org",
	"@type": "Organization",
	"@id": "https://ctenvios.com/#organization",
	name: "CTEnvios",
	alternateName: "CTEnvíos",
	url: "https://ctenvios.com",
	logo: {
		"@type": "ImageObject",
		url: "https://ctenvios.com/ctelogo.png",
		width: 512,
		height: 512,
	},
	contactPoint: {
		"@type": "ContactPoint",
		telephone: "+1-754-277-8810",
		contactType: "customer service",
		availableLanguage: ["Spanish", "English"],
	},
	sameAs: [
		"https://www.facebook.com/people/CTEnvios/100087529462450/",
		"https://www.instagram.com/ctenvios/",
	],
};

// WebSite Schema with SearchAction
const webSiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	"@id": "https://ctenvios.com/#website",
	name: "CTEnvios",
	url: "https://ctenvios.com",
	potentialAction: {
		"@type": "SearchAction",
		target: {
			"@type": "EntryPoint",
			urlTemplate: "https://ctenvios.com/tracking?q={search_term_string}",
		},
		"query-input": "required name=search_term_string",
	},
};

export const JsonLd = () => {
	return (
		<>
			<script
				id="schema-local-business"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(localBusinessSchema),
				}}
			/>
			<script
				id="schema-organization"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(organizationSchema),
				}}
			/>
			<script
				id="schema-website"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(webSiteSchema),
				}}
			/>
		</>
	);
};

export default JsonLd;
