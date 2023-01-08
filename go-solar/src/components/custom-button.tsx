import { StyleProp, TextStyle, Touchable, TouchableOpacity, ViewStyle,Text,StyleSheet } from "react-native";
import React from 'react'
import { toStyleArray, px, colors } from "../styles";

export const textStyles = StyleSheet.create({
    primary:{
        fontSize: px(15),
        color: "white",
        textAlign: "center",
        padding: px(14)
    },
    disabled: {
        fontSize: px(15),
        color: "white",
        textAlign: "center",
        padding: px(14)
    }
});

export const backgroundStyles = StyleSheet.create({
    primary: { alignContent: "center", borderRadius:px(5), backgroundColor: colors.coolRed },
    disabled: { alignContent: "center", borderRadius:px(5), backgroundColor: colors.coolGray },
});

//custom button to be easily styled from here and used across the app.
export const StyledButton = React.memo(function StyledButton({style,variant = "primary", onPress, disabled , ...p} :{
    style?: StyleProp<ViewStyle>,
    variant?: keyof typeof backgroundStyles
    onPress: () => void,
    disabled?: boolean
} & ({
    text: string,
    textStyle?: StyleProp<TextStyle>,
}| {
    children: React.ReactNode
})) {
    return <TouchableOpacity style={[backgroundStyles[variant], ...toStyleArray(style)]} onPress={onPress} disabled={disabled}>
            {'text' in p?
                <Text style={[textStyles[variant], ...toStyleArray(p.textStyle)]}>{p.text}</Text>:
                p.children}
    </TouchableOpacity>
})