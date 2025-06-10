import { Tabs, useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';

export default function TabLayout() {
	const router = useRouter();
	const auth = getAuth();

	if (!auth.currentUser) {
		router.push('/');
		return null;
	}

	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen
				name='home'
				options={{
					title: 'Home',
					tabBarIcon: (props) => (
						<AntDesign name='home' size={props.size} color={props.color} />
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Perfil',
					tabBarIcon: (props) => (
						<AntDesign name='user' size={props.size} color={props.color} />
					),
				}}
			/>
		</Tabs>
	);
}
