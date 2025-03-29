import {
	formatPokemonName,
	formatPokemonNumber,
	getFlavorText,
	pokemonType,
} from '@/common';
import { InfoCard, TagType } from '@/components/atoms';
import { MainHeader } from '@/components/molecules';
import { usePokemon, useSpecies } from '@/hooks';
import { tw } from '@/theme';
import { useGlobalSearchParams } from 'expo-router';
import { Image, ScrollView, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PokemonStats } from '@/components/molecules/PokemonStats';

export default function Pokemon() {
	const { id } = useGlobalSearchParams();

	const { data, error, isLoading } = usePokemon(id as string);

	const { data: species } = useSpecies(id as string);

	const type =
		pokemonType.find((item) => data?.types[0].type.name == item.id) ||
		pokemonType[0];

	const colorType = type.color;

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ActivityIndicator />
			</View>
		);
	}

	if (error || !data) {
		return (
			<Text>Error: {error ? error.message : 'Erro ao carregar os dados'}</Text>
		);
	}

	return (
		<ScrollView contentContainerStyle={tw`bg-white flex-1`}>
			<MainHeader
				isBack
				title={data.name}
				textColor='white'
				backgroundColor={colorType}
			/>
			<View
				style={[
					{
						backgroundColor: colorType,
						marginTop: -5,
						justifyContent: 'center',
						alignItems: 'center',
						borderBottomLeftRadius: 24,
						borderBottomEndRadius: 24,
					},
				]}
			>
				<Image
					source={{
						uri: data.sprites.other?.['official-artwork'].front_default,
					}}
					style={{ width: 200, height: 200, marginBottom: -48, marginTop: -24 }}
				/>
			</View>

			<View style={tw`p-6 pt-10`}>
				<Text style={tw`text-3xl font-bold`}>
					{formatPokemonName(data.name)}
				</Text>
				<Text style={tw`text-xs text-gray-400 font-semibold mb-4`}>
					{formatPokemonNumber(data.id)}
				</Text>

				<View style={tw`flex-row gap-4x mb-4`}>
					{data.types.map((type) => (
						<TagType id={type.type.name} key={type.type.name} size='lg' />
					))}
				</View>

				{species && (
					<Text style={tw`text-sm leading-relaxed white-space text-gray-500`}>
						{getFlavorText(species)}
					</Text>
				)}

				<View style={tw`border-t border-gray-300 my-6`} />

				<View style={tw`flex-row gap-4`}>
					<InfoCard
						colorType={colorType}
						label='Altura'
						info={`${data.height * 10} cm`}
						icon='arrow-expand'
					/>

					<InfoCard
						colorType={colorType}
						label='Peso'
						info={`${data.weight} kg`}
						icon='weight-kilogram'
					/>
				</View>

				<View style={tw` mt-6`}>
					<PokemonStats stats={data.stats} type={type.id} color={colorType} />
				</View>
			</View>
		</ScrollView>
	);
}
