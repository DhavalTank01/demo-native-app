// InputWithLabel.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputWithLabel = ({ label, value, onChangeText, placeholder, name, id, type = "text", secureTextEntry = false }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}<Text style={styles.star}>*</Text> :</Text>
            <TextInput
                style={styles.input}
                value={value}
                id={id}
                name={name}
                type={type}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
        minWidth: "100%",
    },
    star: {
        color: "red",
    },
});

export default InputWithLabel;
