import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/common';

interface PokemonResult {
	name: string;
	url: string;
}

interface FetchResponse {
	data: PokemonResult[];
	nextOffset: number | undefined;
}

const getPokemons = async ({
	pageParam = 0,
	limit = 10,
}): Promise<FetchResponse> => {
	const res = await api.get(`/pokemon?offset=${pageParam}&limit=${limit}`);
	const nextOffset =
		res.data.results.length > 0 ? pageParam + limit : undefined;
	return { data: res.data.results, nextOffset };
};

const getPokemonsByType = async ({
	type,
	pageParam = 0,
	limit = 10,
}: {
	type: string;
	pageParam?: number;
	limit?: number;
}): Promise<FetchResponse> => {
	const res = await api.get(`/type/${type}`);
	const filteredPokemons = res.data.pokemon
		.slice(pageParam, pageParam + limit)
		.map((item: { pokemon: { name: string; url: string } }) => item.pokemon);

	const nextOffset =
		filteredPokemons.length > 0 ? pageParam + limit : undefined;
	return { data: filteredPokemons, nextOffset };
};

export const useSearch = (params?: { type?: string; limit?: number }) => {
	const { type, limit = 10 } = params || {};

	return useInfiniteQuery<FetchResponse>({
		queryKey: ['pokemon-list', type, limit],
		queryFn: ({ pageParam = 0 }) =>
			type
				? getPokemonsByType({ type, pageParam: pageParam as number, limit })
				: getPokemons({ pageParam: pageParam as number, limit }),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage.nextOffset,
		staleTime: Infinity,
	});
};
