import { formatPokemonName } from '@/common';
import { tw } from '@/theme';
import { Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface MainHeaderProps {
	title?: string;
	textColor?: string;
	backgroundColor?: string;
	isBack?: boolean;
}

export const MainHeader = ({
	title,
	textColor,
	backgroundColor = '#fff',
	isBack,
}: MainHeaderProps) => {
	const insets = useSafeAreaInsets();

	const route = useRouter();

	return (
		<View
			style={[
				{ paddingTop: insets.top, backgroundColor },
				tw`border-b-4 border-slate-200`,
			]}
		>
			<View style={tw`px-4 py-6 justify-center items-center shadow`}>
				{isBack && (
					<Pressable
						style={tw`absolute left-4`}
						onPress={() => (route.canGoBack() ? route.back() : route.push('/'))}
					>
						<AntDesign name='arrowleft' size={32} color='#fff' />
					</Pressable>
				)}
				<Text
					style={[
						{
							color: textColor || '#000',
						},
						tw`font-black uppercase text-lg`,
					]}
				>
					{formatPokemonName(title!)}
				</Text>
			</View>
		</View>
	);
};
