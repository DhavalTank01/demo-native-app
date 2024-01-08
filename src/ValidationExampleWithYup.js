import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import * as yup from 'yup';
import ToastManager, { Toast } from 'toastify-react-native';
import axios from 'axios';
import { API } from './api';

const ValidationExampleWithYup = () => {
    let initialData = {
        username: 'test',
        email: 'test@gmail.com',
        password: 'Test@123',
    };
    const [formData, setFormData] = useState(initialData);

    const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleInputChange = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            console.log('Submitted data:', formData);
            setFormData(initialData);
            await axios.post(`${API}/users`, formData);
            Toast.success('SignUp successfully.');
        } catch (error) {
            console.error('Validation error:', error);
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
                onChangeText={(value) => handleInputChange('username', value)}
            />
            <CustomInput
                label="Email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
            />
            <CustomInput
                label="Password"
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const CustomInput = ({ label, value, onChangeText, secureTextEntry }) => (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
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
    label: {
        marginBottom: 5,
        color: 'black',
    },
});

export default ValidationExampleWithYup;
