import { useQuery } from '@tanstack/react-query';
import { api } from '@/common';
import { Pokemon } from '@/types';

export const usePokemon = (name: string) => {
	return useQuery<Pokemon>({
		queryKey: ['pokemon', name],
		queryFn: () => api.get(`/pokemon/${name}`).then((res) => res.data),
		staleTime: Infinity,
	});
};
