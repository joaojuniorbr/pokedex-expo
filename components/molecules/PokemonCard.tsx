import { formatPokemonName, formatPokemonNumber, pokemonType } from '@/common';
import { usePokemon } from '@/hooks';
import { tw } from '@/theme';
import { Href, useRouter } from 'expo-router';
import { Image, Pressable, View } from 'react-native';

import { ActivityIndicator, Text } from 'react-native-paper';
import { TagType } from '../atoms';

export const PokemonCard = ({ pokemonId }: { pokemonId: string }) => {
	const router = useRouter();

	const { data, isLoading } = usePokemon(pokemonId);

	if (isLoading) {
		return (
			<View style={tw`bg-white p-10`}>
				<ActivityIndicator />
			</View>
		);
	}

	if (!data) {
		return null;
	}

	const pokemonUrl = `/pokemon/${data.id}`;

	return (
		<Pressable
			style={tw`flex-row w-full bg-white p-4`}
			onPress={() => router.push(pokemonUrl as Href)}
		>
			<View>
				{data.sprites.other?.['official-artwork'] && (
					<Image
						source={{
							uri: data.sprites.other?.['official-artwork'].front_default,
						}}
						style={tw`w-24 h-24`}
					/>
				)}
			</View>
			<View style={tw`flex-1 pl-6`}>
				<Text style={tw`text-xs text-slate-500`}>
					{formatPokemonNumber(data.id)}
				</Text>
				<Text style={tw`text-lg font-bold mb-2`}>
					{formatPokemonName(data.name)}
				</Text>
				<View style={tw`flex-row gap-4x`}>
					{data.types.map((type) => (
						<TagType id={type.type.name} key={type.type.name} />
					))}
				</View>
			</View>
		</Pressable>
	);
};
