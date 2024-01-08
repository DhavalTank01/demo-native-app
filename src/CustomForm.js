import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import InputWithLabel from './Components/InputWithLabel';
import CustomButton from './Components/CustomButton';
import FileUploadComponent from './Components/FileUploadComponent';
import ToastManager, { Toast } from 'toastify-react-native';

const CustomForm = () => {
    let initValue = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        file: null,
    };
    const [formData, setFormData] = useState(initValue);
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentTab, setCurrentTab] = useState("Login");

    const handleSave = () => {
        // Handle save logic here
        console.log('formData :>> ', formData);
        try {
            Toast.success(`${currentTab === "Login" ? "Login" : "SignUp"} successfully.`)
        } catch (error) {
            Toast.error("Something went wrong.");
        }
    };

    const handleCancel = () => {
        // Handle cancel logic here
    };

    const handleChangeText = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSelectFile = (file) => {
        setFormData((prev) => ({ ...prev, file }));
    }

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
        setFormData(initValue);
    }

    return (
        <View style={styles.container}>
            <ToastManager />
            <View style={styles.buttons}>
                <TouchableOpacity style={[styles.tabBtn, currentTab === "Login" ? styles.activeBtn : null]} onPress={() => handleTabChange("Login")}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabBtn, currentTab === "SignUp" ? styles.activeBtn : null]} onPress={() => handleTabChange("SignUp")}>
                    <Text style={styles.btnText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View>
                {currentTab === "Login" ?
                    <View>
                        <InputWithLabel
                            label="Email"
                            onChangeText={(text) => handleChangeText("email", text)}
                            value={formData?.email}
                            name="email"
                            id="email"
                            placeholder="Enter email name"
                            type="email"
                        />
                        <InputWithLabel
                            label="Password"
                            onChangeText={(text) => handleChangeText("password", text)}
                            value={formData?.password}
                            name="password"
                            id="password"
                            placeholder="Enter password name"
                            type="password"
                            secureTextEntry={true}
                        />
                    </View> :
                    <View style={styles.formContainer}>
                        <InputWithLabel
                            label="First Name"
                            onChangeText={(text) => handleChangeText("first_name", text)}
                            value={formData?.first_name}
                            name="first_name"
                            id="first_name"
                            placeholder="Enter first name"
                            type="text"
                        />
                        <InputWithLabel
                            label="last Name"
                            onChangeText={(text) => handleChangeText("last_name", text)}
                            value={formData?.last_name}
                            name="last_name"
                            id="last_name"
                            placeholder="Enter last name"
                            type="text"
                        />
                        <InputWithLabel
                            label="Email"
                            onChangeText={(text) => handleChangeText("email", text)}
                            value={formData?.email}
                            name="email"
                            id="email"
                            placeholder="Enter email name"
                            type="email"
                        />
                        <InputWithLabel
                            label="Password"
                            onChangeText={(text) => handleChangeText("password", text)}
                            value={formData?.password}
                            name="password"
                            id="password"
                            placeholder="Enter password name"
                            type="password"
                            secureTextEntry={true}
                        />
                        <View style={styles.fileUploadContainer}>
                            <FileUploadComponent onSelect={handleSelectFile} />
                            <Button title='Upload' />
                        </View>
                    </View>
                }
                <View style={styles.buttonContainer}>
                    <CustomButton title="Save" onPress={handleSave} variant='success' />
                    <CustomButton title="Cancel" onPress={handleCancel} variant='danger' />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
    },
    buttons: {
        flexDirection: 'row',
        gap: 10,
    },
    activeBtn: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
    },
    btnText: {
        textAlign: "center"
    },
    tabBtn: {
        padding: 10,
        width: 100,
        marginBottom: 10,
    },
    formContainer: {

    },
    buttonContainer: {
        flexDirection: 'row',
    },
    fileUploadContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
});

export default CustomForm;