import { tw } from '@/theme';
import { Image, Pressable, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge } from 'react-native-paper';

interface HeaderProps {
	onShowFilter?: () => void;
	countFilter?: number;
}

export const Header = ({ onShowFilter, countFilter }: HeaderProps) => {
	const insets = useSafeAreaInsets();

	return (
		<View
			style={[
				{ paddingTop: insets.top },
				tw`bg-white border-b-4 border-slate-200`,
			]}
		>
			<View style={tw`flex-row items-center px-4 py-6 shadow`}>
				<View style={tw`flex-1`}>
					<Image
						source={require('@/assets/images/logo-pokemon.png')}
						style={tw`w-22 h-8`}
					/>
				</View>

				<View style={tw`flex-row items-center`}>
					<Pressable
						onPress={onShowFilter}
						style={tw`p-2 rounded bg-blue-600 relative`}
					>
						{Boolean(countFilter) && (
							<Badge style={tw`absolute -top-2 -right-2`}>{countFilter}</Badge>
						)}
						<AntDesign name='filter' size={20} color='white' />
					</Pressable>
				</View>
			</View>
		</View>
	);
};
