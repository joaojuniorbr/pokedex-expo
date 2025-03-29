import { pokemonType } from '@/common';
import { tw } from '@/theme';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface TagTypeProps {
	id: string;
	size?: 'normal' | 'lg';
}

export const TagType = ({ id, size = 'normal' }: TagTypeProps) => {
	const formated = pokemonType.find((item) => item.id === id);

	if (!formated) {
		return null;
	}

	const style = {
		normal: {
			container: 'py-1 px-2',
			text: 'text-xs',
		},
		lg: {
			container: 'py-2 px-4',
			text: 'text-base',
		},
	};

	return (
		<View style={tw`bg-[${formated.color}] rounded ${style[size].container}`}>
			<Text style={tw`uppercase font-bold text-white ${style[size].text}`}>
				{formated.name}
			</Text>
		</View>
	);
};
