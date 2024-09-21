import React, { ReactNode } from 'react';
import { Pressable, View, StyleSheet, Text, PressableProps, Dimensions, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { colors } from '../constants';

interface CustomButtonProps extends PressableProps {
	label: string;
	variant?: 'filled' | 'outlined';
	size?: 'large' | 'medium';
	inValid?: boolean;
	style?: StyleProp<TextStyle>;
	textStyle?: StyleProp<TextStyle>;
	icon?: ReactNode;
}

const deviceHeight = Dimensions.get('screen').height;


function CustomButton({
	label,
	variant = 'filled',
	size = 'large',
	inValid = false,
	style = null,
	textStyle = null,
	icon = null,
	...props
}: CustomButtonProps) {
	return (
		<Pressable
			disabled={inValid}
			style={({ pressed }) => [
				styles.container,
				styles[variant],
				pressed ? styles[`${variant}Pressed`] : styles[variant],
				inValid && styles.inValid,
				style,
			]}
			{...props}>
			<View style={styles[size]}>
				{icon}
				<Text style={[styles.text, styles[`${variant}Text`], textStyle]}>{label}</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 12,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	inValid: {
		opacity: 0.5,
	},
	filled: {
		backgroundColor: colors.BLUE_MAIN
	},
	outlined: {
		borderColor: colors.BLUE_MAIN,
		borderWidth: 1,

	},
	filledPressed: {
		backgroundColor: colors.BLUE_PRESSED,
	},
	outlinedPressed: {
		borderColor: colors.BLUE_MAIN,
		borderWidth: 1,
		opacity: 0.5,
	},
	large: {
		width: '100%',
		paddingVertical: deviceHeight > 700 ? 15 : 10,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		gap: 5,
	},
	medium: {
		width: '50%',
		paddingVertical: deviceHeight > 700 ? 12 : 8,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		gap: 5,
	},
	text: {
		fontSize: 16,
		fontWeight: '700',
	},
	filledText: {
		color: colors.WHITE,
	},
	outlinedText: {
		color: colors.BLUE_MAIN,
	},
});

export default CustomButton;