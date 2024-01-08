// CustomDropdown.js
import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomDropdown = ({ options, onSelect, selectedValue, customStyle, onButtonPress }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (value) => {
        onSelect(value);
        setDropdownVisible(false);
    };

    useEffect(() => {
        // Reset searchQuery when dropdown is closed
        if (!dropdownVisible) {
            setSearchQuery('');
        }
    }, [dropdownVisible]);

    return (
        <View style={[styles.container, customStyle]}>
            <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
                <View style={styles.selectContainer}>
                    <Text>{selectedValue}</Text>
                </View>
            </TouchableOpacity>

            {dropdownVisible && (
                <View style={styles.dropdownContainer}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            value={searchQuery}
                            inputMode='search'
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                        {searchQuery !== '' && (
                            <TouchableOpacity
                                style={styles.clearButton}
                                onPress={() => setSearchQuery('')}
                            >
                                <Icon name="times" size={20} color="#333" />
                            </TouchableOpacity>
                        )}
                        {/* Add your original button here */}
                        <TouchableOpacity
                            style={styles.searchButton}
                            onPress={onButtonPress}
                        >
                            <Text>Button</Text>
                        </TouchableOpacity>
                    </View>


                    {filteredOptions?.length ? filteredOptions.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            style={styles.option}
                            onPress={() => handleSelect(option.value)}
                        >
                            <Text>{option.label}</Text>
                        </TouchableOpacity>
                    )) :
                        <Text style={styles.option}>No option found.</Text>
                    }
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    selectContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
    },
    dropdownContainer: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 8,
        marginTop: 5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    searchInput: {
        flex: 1,
        padding: 8,
    },
    searchButton: {
        padding: 8,
        borderLeftWidth: 1,
        borderColor: '#ccc',
    },
    clearButton: {
        padding: 8,
        borderLeftWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },

    option: {
        padding: 8,
    },
});

export default CustomDropdown;
