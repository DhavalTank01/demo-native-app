// CustomDropDownWithSearch.js
import React, { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import CustomDropdown from './Components/CustomDropdown';

const CustomDropDownWithSearch = () => {
    const pageSizeOptions = [
        { label: '5', value: '5' },
        { label: '10', value: '10' },
        { label: '20', value: '20' },
        { label: '50', value: '50' },
        { label: '100', value: '100' },
    ];
    const [selectedValue, setSelectedValue] = useState(pageSizeOptions[0]?.value);
    const handleSelect = (value) => {
        setSelectedValue(value);
    };

    const handleCreate = () => {
        console.log("create")
    }
    return (
        <View style={styles.container}>
            <View style={styles.dropdownWrapper}>
                <Text>Select: </Text>
                <CustomDropdown
                    customStyle={{ width: 200 }}
                    options={pageSizeOptions}
                    onSelect={handleSelect}
                    selectedValue={selectedValue}
                    onButtonPress={handleCreate}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    dropdownWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    }
})

export default CustomDropDownWithSearch;
