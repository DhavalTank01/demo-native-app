// CustomButton.js
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ title = "Save", onPress, variant = "success", inlineButtonStyle = {}, inlineTextStyle = {} }) => {
    let buttonStyle = variant === "success" ? styles.successButton : styles.dangerButton;
    let buttonTextStyle = variant === "success" ? styles.successText : styles.dangerText;

    return (
        <TouchableOpacity
            style={[styles.button, buttonStyle, inlineButtonStyle]} onPress={onPress}>
            <Text style={[styles.buttonText, buttonTextStyle, inlineTextStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        minWidth: 150,
    },
    successText: {
        color: 'green',
    },
    dangerText: {
        color: 'red',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dangerButton: {
        borderColor: 'red',
    },
    successButton: {
        borderColor: 'green',
    },
});

export default CustomButton