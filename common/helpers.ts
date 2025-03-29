import { Species } from '@/types';

/**
 * Função para formatar o número dos Pokemons
 *  @params id - o número do pokemon
 */
const formatPokemonNumber = (id: number): string =>
	`#${id.toString().padStart(3, '0')}`;

/**
 * Função para formatar o nome dos Pokemons que vem da API
 * @params name - o nome do pokemon
 *
 */
const formatPokemonName = (name: string): string =>
	name
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

/**
 * Função para retornar o texto de descricão do pokemon
 * @params species_data - dados da especie
 */
const getFlavorText = (species_data: Species) => {
	const portuguese_entry = species_data.flavor_text_entries.find(
		(entry) => entry.language.name === 'pt-BR'
	);

	const english_entry = species_data.flavor_text_entries.find(
		(entry) => entry.language.name === 'en'
	);

	if (portuguese_entry) {
		return portuguese_entry.flavor_text.replace(/[\n\f]/g, ' ');
	}

	if (english_entry) {
		return english_entry.flavor_text.replace(/[\n\f]/g, ' ');
	}

	return 'Texto não disponível';
};

export { formatPokemonName, formatPokemonNumber, getFlavorText };
