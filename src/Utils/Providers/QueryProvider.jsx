"use client";
import { React, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const QueryProvider = ({ children }) => {
	const [client] = useState(
		() =>
			new QueryClient({
				defaultOptions: { queries: { staleTime: 5000, refetchOnWindowFocus: false } },
			}),
	);

	return (
		<QueryClientProvider client={client}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default QueryProvider;
