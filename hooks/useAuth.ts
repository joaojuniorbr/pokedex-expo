import { authFirebase } from '@/common/firebaseConfig';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const useAuth = () => {
	const router = useRouter();
	const [user, setUser] = useState<User | null>();

	const logout = async () => {
		await signOut(authFirebase);
		router.push('/');
	};

	useEffect(() => {
		const unsub = onAuthStateChanged(authFirebase, (userLogged) => {
			setUser(userLogged);
		});

		return () => unsub();
	}, []);

	return { user, logout };
};
