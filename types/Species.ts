export interface Species {
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
