import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import * as yup from 'yup';
import ToastManager, { Toast } from 'toastify-react-native';
import axios from 'axios';
import { API } from './api';
import { signUpFormValidationSchema, validateData } from './validationSchema';
import { signUpInitialData } from './Constant';

const ValidationExampleWithYup = () => {
    const [formData, setFormData] = useState(signUpInitialData);
    const [errors, setErrors] = useState({});

    const handleInputChange = async (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            await validateData(signUpFormValidationSchema, formData)
            console.log('Submitted data:', formData);
            setFormData(signUpInitialData);
            await axios.post(`${API}/users`, formData);
            Toast.success('SignUp successfully.');
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                // Handle Yup validation errors
                const validationErrors = {};
                error.inner.forEach((e) => {
                    validationErrors[e.path] = e.message;
                });
                setErrors(validationErrors);
            } else {
                // Handle other errors (e.g., network errors)
                console.error('Error:', error.message);
                Toast.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <ToastManager />
            <View style={styles.formTitle}>
                <Text>Sign Up</Text>
            </View>
            <CustomInput
                label="Username"
                value={formData.username}
                error={errors.username}
                onChangeText={(value) => handleInputChange('username', value)}
            />
            <CustomInput
                label="Email"
                value={formData.email}
                error={errors.email}
                onChangeText={(value) => handleInputChange('email', value)}
            />
            <CustomInput
                label="Password"
                value={formData.password}
                error={errors.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const CustomInput = ({ label, value, onChangeText, secureTextEntry, error }) => (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 16,
    },
    formTitle: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        marginBottom: 15,
        width: '100%',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
    },
    errorMessage: {
        color: "red",
    },
    label: {
        marginBottom: 5,
        color: 'black',
    },
});

export default ValidationExampleWithYup;
