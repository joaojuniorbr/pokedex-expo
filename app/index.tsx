import { Button, View, Alert, TextInput, Text, Pressable } from 'react-native';

import { tw } from '@/theme';

import { useState } from 'react';
import {
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { authFirebase } from '@/common/firebaseConfig';
import { useAuth } from '@/hooks';
import { useRouter } from 'expo-router';

export default function IndexPage() {
	const router = useRouter();

	const { user } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignIn = async () => {
		try {
			await signInWithEmailAndPassword(authFirebase, email, password);
			Alert.alert('Login realizado com sucesso');
		} catch (error: any) {
			Alert.alert('Erro ao logar', error.message);
		}
	};

	const handleResetPassword = async () => {
		try {
			await sendPasswordResetEmail(authFirebase, email);
			Alert.alert('Email de recuperação enviado');
		} catch (error: any) {
			Alert.alert('Erro ao enviar email de recuperação', error.message);
		}
	};

	if (user) {
		router.push('/(tabs)/home');
	}

	return (
		<View style={tw`flex-1 items-center justify-center bg-white p-8`}>
			<View style={tw`w-full gap-4`}>
				<Text style={tw`text-2xl font-bold mb-4`}>Acessar Pokedex</Text>
				<TextInput
					keyboardType='email-address'
					autoCapitalize='none'
					autoComplete='email'
					placeholder='Email'
					onChangeText={setEmail}
					style={tw`border border-gray-300 p-2 rounded w-full`}
				/>
				<TextInput
					placeholder='Senha'
					secureTextEntry
					onChangeText={setPassword}
					style={tw`border border-gray-300 p-2 rounded w-full`}
				/>

				<Button title='Acessar' onPress={handleSignIn} />

				<Pressable onPress={handleResetPassword} style={tw`mt-4`}>
					<Text
						style={tw`text-stone-400 font-bold text-center text-xs uppercase`}
					>
						Esqueci minha senha
					</Text>
				</Pressable>
			</View>
		</View>
	);
}
