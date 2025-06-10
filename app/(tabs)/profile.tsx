import { useEffect, useState } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { tw } from '@/theme';
import { useAuth } from '@/hooks';
import { updateProfile } from 'firebase/auth';

export default function ProfileScreen() {
	const [name, setName] = useState('');

	const { user, logout } = useAuth();

	const handleSave = () => {
		if (user) {
			updateProfile(user, { displayName: name })
				.then(() => {
					alert('Nome atualizado com sucesso');
				})
				.catch((error) => {
					alert('Erro ao atualizar nome: ' + error.message);
				});
		}
	};

	const handleLogout = () => {
		logout();
	};

	useEffect(() => {
		if (user) {
			setName(user.displayName || '');
		}
	}, [user]);

	return (
		<View style={tw`flex-1 justify-center bg-white p-8`}>
			<Text style={tw`text-2xl font-bold mb-8`}>Perfil</Text>
			{user ? (
				<View style={tw`w-full gap-4`}>
					<Text style={tw`text-lg font-bold`}>{user.email}</Text>
					<TextInput
						placeholder='Nome'
						value={name}
						onChangeText={setName}
						style={tw`border border-gray-300 p-2 rounded`}
					/>
					<Button title='Atualizar Nome' onPress={handleSave} />

					<View style={tw`border-t border-gray-300 my-8`} />

					<Button title='Logout' onPress={handleLogout} />
				</View>
			) : (
				<Text>Nenhum usuário logado</Text>
			)}
		</View>
	);
}
