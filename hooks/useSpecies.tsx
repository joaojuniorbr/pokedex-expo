import { api } from '@/common';
import { useQuery } from '@tanstack/react-query';

export interface SpeciesInterface {
	base_happiness: number;
	capture_rate: number;
	color: {
		name: string;
		url: string;
	};
	evolution_chain: {
		url: string;
	};
	evolves_from_species: {
		name: string;
		url: string;
	};
	flavor_text_entries: {
		flavor_text: string;
		language: {
			name: string;
			url: string;
		};
		version: {
			name: string;
			url: string;
		};
	}[];
}

export const useSpecies = (name: string) => {
	return useQuery<SpeciesInterface>({
		queryKey: ['species', name],
		queryFn: () => api.get(`/pokemon-species/${name}`).then((res) => res.data),
		staleTime: Infinity,
	});
};
