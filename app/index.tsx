import { pokemonType } from '@/common';
import { Header, PokemonCard } from '@/components/molecules';
import { useSearch } from '@/hooks';
import { tw } from '@/theme';
import { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { Modal, Text, ActivityIndicator } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

export default function Index() {
	const [showFilter, setShowFilter] = useState(false);
	const [type, setType] = useState<string>();
	const limit = 20;

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
		useSearch({
			type,
			limit,
		});

	const toggleFilter = () => setShowFilter(!showFilter);

	const loadMore = () => {
		if (hasNextPage) {
			fetchNextPage();
		}
	};

	const countFilter = () => {
		return Boolean(type) ? 1 : 0;
	};

	return (
		<View style={{ flex: 1 }}>
			<Header onShowFilter={toggleFilter} countFilter={countFilter()} />

			<FlatList
				data={data?.pages.flatMap((page) => page.data) ?? []}
				renderItem={({ item }) => <PokemonCard pokemonId={item.name} />}
				ItemSeparatorComponent={() => (
					<View style={tw`border-t border-slate-200`} />
				)}
				onEndReached={loadMore}
				onEndReachedThreshold={0.5}
				ListFooterComponent={
					isFetchingNextPage ? (
						<View style={tw`py-4`}>
							<ActivityIndicator />
						</View>
					) : null
				}
				style={{ flex: 1 }}
			/>

			<Modal visible={showFilter} onDismiss={toggleFilter}>
				<View style={tw`bg-white p-6`}>
					<Text style={tw`font-bold text-lg mb-8`}>Escolha um tipo:</Text>

					<View style={tw`flex-row gap-4 flex-wrap`}>
						{pokemonType.map((item) => {
							const isSelected = type === item.id;
							return (
								<Pressable
									key={item.id}
									style={tw`flex-row gap-2 items-center p-2 border-[${
										item.color
									}] border rounded bg-[${
										isSelected ? 'transparent' : item.color
									}] `}
									onPress={() => {
										setType(isSelected ? undefined : item.id);
										refetch();
										toggleFilter();
									}}
								>
									<Text
										style={tw`text-xs font-bold text-[${
											isSelected ? item.color : 'white'
										}]`}
									>
										{item.name}
									</Text>

									{isSelected && <AntDesign name='close' color={item.color} />}
								</Pressable>
							);
						})}
					</View>
				</View>
			</Modal>
		</View>
	);
}
