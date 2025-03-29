import { tw } from '@/theme';
import { DimensionValue, View } from 'react-native';
import { Text } from 'react-native-paper';

export interface Stat {
	base_stat: number;
	effort: number;
	stat: {
		name: string;
		url: string;
	};
}

const MAX_STATS = {
	hp: 255,
	attack: 190,
	defense: 230,
	'special-attack': 180,
	'special-defense': 230,
	speed: 180,
};

const NAME_STATS = {
	hp: 'HP',
	attack: 'Ataque',
	defense: 'Defesa',
	'special-attack': 'Ataque Especial',
	'special-defense': 'Defesa Especial',
	speed: 'Velocidade',
};

const statsPercent = (stats: Stat[]) =>
	stats.map((stat) => ({
		name: stat.stat.name,
		base_stat: stat.base_stat,
		percentage: (
			(stat.base_stat / MAX_STATS[stat.stat.name as keyof typeof MAX_STATS]) *
			100
		).toFixed(2),
	}));

interface PokemonStatsProps {
	stats: Stat[];
	type: string;
	color: string;
}

export const PokemonStats = (props: PokemonStatsProps) => {
	return (
		<View>
			{statsPercent(props.stats).map((stat) => (
				<View key={stat.name} style={tw`flex-row justify-between py-1`}>
					<View style={tw`w-1/3`}>
						<Text style={tw`text-xs font-bold text-[${props.color}]`}>
							{NAME_STATS[stat.name as keyof typeof NAME_STATS]}
						</Text>
					</View>
					<View style={tw`w-1/8`}>
						<Text style={tw`text-xs text-center font-bold`}>
							{stat.base_stat}
						</Text>
					</View>
					<View style={tw`flex-1`}>
						<View style={tw`w-full bg-gray-200 rounded-full h-3`}>
							<View
								style={{
									height: '100%',
									borderRadius: 9999,
									width: `${stat.percentage}%` as DimensionValue,
									backgroundColor: props.color,
								}}
							/>
						</View>
					</View>
				</View>
			))}
		</View>
	);
};
