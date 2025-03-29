import { create } from 'twrnc';

export const tw = create({
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter_400Regular', 'sans-serif'],
				inter200: ['Inter_200ExtraLight', 'sans-serif'],
				inter300: ['Inter_300Light', 'sans-serif'],
				inter400: ['Inter_400Regular', 'sans-serif'],
				inter500: ['Inter_500Medium', 'sans-serif'],
				inter600: ['Inter_600SemiBold', 'sans-serif'],
				inter700: ['Inter_700Bold', 'sans-serif'],
				inter800: ['Inter_800ExtraBold', 'sans-serif'],
				inter900: ['Inter_900Black', 'sans-serif'],
			},
		},
	},
});
