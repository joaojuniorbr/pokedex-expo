export interface Pokemon {
	abilities: Ability[];
	base_experience: number;
	forms: Species[];
	game_indices: GameIndex[];
	height: number;
	held_items: HeldItem[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: Move[];
	name: string;
	order: number;
	species: Species;
	sprites: Sprites;
	stats: Stat[];
	types: Type[];
	weight: number;
}

interface Ability {
	ability: Species;
	is_hidden: boolean;
	slot: number;
}

interface Species {
	name: string;
	url: string;
}

interface GameIndex {
	game_index: number;
	version: Species;
}

interface HeldItem {
	item: Species;
	version_details: VersionDetail[];
}

interface VersionDetail {
	rarity: number;
	version: Species;
}

interface Move {
	move: Species;
	version_group_details: VersionGroupDetail[];
}

interface VersionGroupDetail {
	level_learned_at: number;
	move_learn_method: Species;
	version_group: Species;
}

interface Versions {
	'generation-i': GenerationI;
}

interface Sprites {
	back_default: string;
	back_female: null | string;
	back_shiny: string;
	back_shiny_female: null | string;
	front_default: string;
	front_female: null | string;
	front_shiny: string;
	front_shiny_female: null | string;
	other?: Other;
	versions?: Versions;
	animated?: Sprites;
}

interface GenerationI {
	'red-blue': RedBlue;
	yellow: RedBlue;
}

interface RedBlue {
	back_default: string;
	back_gray: string;
	back_transparent: string;
	front_default: string;
	front_gray: string;
	front_transparent: string;
}

interface Home {
	front_default: string;
	front_female: null;
	front_shiny: string;
	front_shiny_female: null;
}

interface DreamWorld {
	front_default: string;
	front_female: null | string;
}

interface Other {
	dream_world: DreamWorld;
	home: Home;
	'official-artwork': OfficialArtwork;
}

interface OfficialArtwork {
	front_default: string;
}

export interface Stat {
	base_stat: number;
	effort: number;
	stat: Species;
}

export interface Type {
	slot: number;
	type: Species;
}
