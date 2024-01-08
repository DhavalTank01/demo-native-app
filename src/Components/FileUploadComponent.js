import React, { useState, useCallback, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const FileUploadComponent = ({ onSelect }) => {
    const [file, setFile] = useState(null);

    useEffect(() => {
        setFile(null);
    }, [])

    const onFileChange = useCallback(async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
            });

            if (result.canceled === false) {
                setFile(result);
                onSelect(result);
            } else {
                setFile(null);
            }
        } catch (error) {
            console.error('Error picking document:', error);
        }
    }, []);

    return (
        <View style={styles.fileUploadWrapper}>
            <TouchableOpacity onPress={onFileChange} style={styles.selectButton}>
                <Text style={{ color: 'white' }}>Choose File</Text>
            </TouchableOpacity>
            {/* ?.slice(0, 20) */}
            <View style={styles.fileName}>
                {!!file ? <Text>{file?.assets[0]?.name?.toString()}</Text> : <Text>No file chosen</Text>}
            </View>
        </View>
    );
};


export default FileUploadComponent;

const styles = StyleSheet.create({
    fileUploadWrapper: {
        maxWidth: 275,
        minWidth: 275,
        borderWidth: 1,
        borderStyle: "dotted",
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "center",
        gap: 10,
    },
    selectButton: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    fileName: {
        flex: 1,
    },
});
