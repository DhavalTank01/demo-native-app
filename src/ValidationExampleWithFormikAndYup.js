import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ToastManager, { Toast } from 'toastify-react-native';

// Custom Input Component
const CustomInput = ({ label, formikProps, formikKey, ...rest }) => (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            value={formikProps.values[formikKey]}
            onChangeText={formikProps.handleChange(formikKey)}
            onBlur={formikProps.handleBlur(formikKey)}
            {...rest}
        />
        {formikProps.touched[formikKey] && formikProps.errors[formikKey] ? (
            <Text style={styles.errorText}>{formikProps.errors[formikKey]}</Text>
        ) : null}
    </View>
);

const ValidationExample = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: yup.object().shape({
            username: yup.string().required('Username is required'),
            email: yup.string().email('Invalid email').required('Email is required'),
            password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: (values) => {
            console.log('Submitted data:', values);
            formik.resetForm();
            Toast.success(`SignUp successfully.`);
        },
    });

    return (
        <View style={styles.container}>
            <ToastManager />
            <CustomInput
                label="Username"
                formikProps={formik}
                formikKey="username"
                style={styles.input}
            />
            <CustomInput
                label="Email"
                formikProps={formik}
                formikKey="email"
                style={styles.input}
            />
            <CustomInput
                label="Password"
                formikProps={formik}
                formikKey="password"
                style={styles.input}
                secureTextEntry
            />
            <Button
                title="Submit"
                onPress={formik.handleSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 16,
    },
    inputContainer: {
        marginBottom: 15,
        width: "100%",
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
    },
    label: {
        marginBottom: 5,
        color: 'black',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});

export default ValidationExample;
