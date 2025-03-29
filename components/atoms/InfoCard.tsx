import { tw } from '@/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface InfoCardProps {
	colorType?: string;
	label: string;
	info: string;
	icon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

export const InfoCard = ({
	colorType = '#000',
	label,
	info,
	icon,
}: InfoCardProps) => (
	<View style={tw`flex-row items-center p-4 rounded bg-[${colorType}] flex-1`}>
		<MaterialCommunityIcons name={icon} size={32} color='#fff' />
		<View style={tw`pl-4`}>
			<Text style={tw`text-xs uppercase text-white`}>{label}</Text>
			<Text style={tw`text-base font-bold text-white`}>{info}</Text>
		</View>
	</View>
);
