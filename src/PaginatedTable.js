// PaginatedTable.js
// Import necessary components and libraries
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';
import RBSheet from "react-native-raw-bottom-sheet";
import _ from 'lodash';
import CustomDropdown from './Components/Dropdown';
import users from './api/users';

export const sampleData = users;
export const pageSizeOptions = [
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
];
export const tableHeader = ['Select', 'Client Name', 'Status'];

const PaginatedTable = () => {
    const bottomSheetRef = useRef();

    const [searchTerm, setSearchTerm] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortedColumn, setSortedColumn] = useState(null);
    const [selectedRow, setSelectedRow] = useState({});
    const [bottomSheetDetails, setBottomSheetDetails] = useState(null);


    useEffect(() => {
        // Set your data to tableData and sortedData
        setTableData(sampleData);
        setSortedData(sampleData);
    }, []);

    const handlePageChange = (newPage, index = null) => {
        if (index) {
            if (index < 5)
                setCurrentPage(Number.parseInt(newPage - 5));
            else
                setCurrentPage(Number.parseInt(newPage + 5));
        } else {
            setCurrentPage(Number.parseInt(newPage));
        }
    };

    const handlePageSizeChange = (pageSize) => {
        setItemsPerPage(Number.parseInt(pageSize));
        setCurrentPage(1); // Reset current page when page size changes
    };

    const handleSearch = (text) => {
        // Update the search term and filter the data
        setSearchTerm(text);

        // Filter the data based on the search term
        const filteredData = tableData.filter((item) => {
            const fullName = `${item.user.name.title} ${item.user.name.first} ${item.user.name.last}`.toLowerCase();
            const email = item.user.email.toLowerCase();
            const phone = item.user.phone.toLowerCase().replace("-", "");
            return fullName.includes(text.toLowerCase()) || phone.includes(text.toLowerCase()) || email.includes(text.toLowerCase());
        });

        setSortedData(filteredData);
        setCurrentPage(1);
    };

    const clearSearch = () => {
        setSearchTerm(null);
        setSortedData(tableData);
        setCurrentPage(1);
    };

    const generatePageNumbers = () => {
        const totalPages = Math.ceil(sortedData.length / itemsPerPage);
        const visiblePages = 5;
        const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

        if (totalPages <= visiblePages) {
            return pages;
        }

        const startIndex = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
        const endIndex = Math.min(startIndex + visiblePages - 1, totalPages);

        const result = [];

        if (startIndex > 1) {
            result.push(1, '...');
        }

        result.push(...pages.slice(startIndex - 1, endIndex));

        if (endIndex < totalPages) {
            result.push('...', totalPages);
        }

        return result;
    };

    const handleSort = (colName) => {
        let columnName = colName?.split(" ")[0].toLowerCase();
        const isAsc = sortOrder === 'asc';
        const newSortOrder = sortedColumn === colName ? (isAsc ? 'desc' : 'asc') : 'asc';

        setSortOrder(newSortOrder);
        setSortedColumn(colName);

        let sortedDataCopy;

        if (columnName === 'email' || columnName === 'phone') {
            // If sorting by email or phone, access the properties directly
            sortedDataCopy = _.orderBy(sortedData, [`user.${columnName}`], [newSortOrder]);
        } else {
            // For other columns, access the nested properties
            sortedDataCopy = _.orderBy(
                sortedData,
                [(item) => item.user.name[columnName]],
                [newSortOrder]
            );
        }

        setSortedData(sortedDataCopy);
        setCurrentPage(1);
    };

    const handleCheckboxToggle = (row) => {
        setSelectedRow(selectedRow === row?.user?.registered ? null : row?.user?.registered);

        // // Show the bottom sheet with details when a checkbox is clicked
        setBottomSheetDetails(row);

        bottomSheetRef.current.open();
    };

    const closeBottomSheet = () => {
        setBottomSheetDetails(null);
        setSelectedRow(null);
    };

    const renderBottomSheetContent = () => {
        return (
            <View style={styles.bottomSheetContainer}>
                <View style={styles.bottomSheetContent}>
                    {/* Customize this section to display details */}
                    <Text style={styles.bottomSheetTitle}>User Details</Text>
                    <View style={styles.userInfoContainer}>
                        <Image
                            style={styles.bottomSheetUserImage}
                            source={{ uri: bottomSheetDetails?.user.picture.thumbnail }}
                        />
                        <View style={styles.userInfo}>
                            <Text style={styles.userInfoText}>Name: {bottomSheetDetails?.user.name.first} {bottomSheetDetails?.user.name.last}</Text>
                            <Text style={styles.userInfoText}>Email: {bottomSheetDetails?.user.email}</Text>
                            <Text style={styles.userInfoText}>Phone: {bottomSheetDetails?.user.phone}</Text>
                            <Text style={styles.userInfoText}>City: {bottomSheetDetails?.user.location.city}</Text>
                            <Text style={styles.userInfoText}>Gender: {bottomSheetDetails?.user.gender}</Text>
                            {/* Add more details as needed */}
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const renderPagination = () => {
        if (sortedData.length === 0) {
            return (
                <View style={styles.noDataMessage}>
                    <Text>No data found</Text>
                </View>
            );
        }

        return (
            <View style={styles.pagination}>
                <TouchableOpacity
                    onPress={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <Text style={{ color: currentPage === 1 ? 'gray' : 'black' }}>Previous</Text>
                </TouchableOpacity>

                {generatePageNumbers().map((pageNumber, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => pageNumber !== "..." ? handlePageChange(pageNumber) : handlePageChange(currentPage, index)}
                        style={[
                            styles.pageNumber,
                            {
                                backgroundColor:
                                    pageNumber === currentPage ? 'blue' : 'white',
                            },
                        ]}
                    >
                        <Text
                            style={{
                                color: pageNumber === currentPage ? 'white' : 'black',
                            }}
                        >
                            {pageNumber}
                        </Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    onPress={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(sortedData.length / itemsPerPage)}
                >
                    <Text
                        style={{
                            color:
                                currentPage === Math.ceil(sortedData.length / itemsPerPage)
                                    ? 'gray'
                                    : 'black',
                        }}
                    >
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderTableHeaders = () => {
        return tableHeader.map((columnName, index) => (
            <View key={index} style={styles.allHeader}>
                {columnName === 'Select' ? (
                    <Text style={styles.headText}>{columnName}</Text>
                ) : (
                    <TouchableOpacity onPress={() => handleSort(columnName)} style={styles.head}>
                        <Text style={styles.headText}>{columnName}</Text>
                        {sortedColumn === columnName && (
                            <Text style={{}}>{sortOrder === 'asc' ? '🔼' : '🔽'}</Text>
                        )}
                    </TouchableOpacity>
                )}
            </View>
        ));
    };

    const renderTableRows = () => {
        return paginatedData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
                {/* Checkbox */}
                <CheckBox
                    checked={selectedRow === row?.user?.registered ? true : false}
                    onPress={() => handleCheckboxToggle(row)}
                />

                {/* User Image */}
                <Image
                    style={styles.userImage}
                    source={{ uri: row.user.picture.thumbnail }}
                />

                {/* User Full Name */}
                <Text style={styles.userName}>
                    {`${row.user.name.first} ${row.user.name.last}`}
                </Text>

                {/* User City Name */}
                <View>
                    <Text style={[styles.userCity, rowIndex % 2 ? {
                        color: "#F99500",
                        backgroundColor: "#FFE6C0",
                    } : {
                        color: "#007F00",
                        backgroundColor: "#DDFFCD",
                    }]}>{row.user.location.city}</Text>
                </View>
            </View>
        ));
    };


    // Pagination logic to get current page data
    const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <ScrollView style={styles.container}>
            <View>
                {/* Add page size selection dropdown */}
                <View style={styles.pageSizeContainer}>
                    <Text>Show: </Text>
                    <CustomDropdown
                        options={pageSizeOptions}
                        onSelect={(value) => handlePageSizeChange(value)}
                        customDropdownStyle={{ width: 70 }}
                    />
                </View>

                {/* Add search bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        value={searchTerm}
                        onChangeText={handleSearch}
                        inputMode="search"
                    />
                    {/* Remove the onPress handler from the "Search" button */}
                    <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
                        <Text>Clear</Text>
                    </TouchableOpacity>
                </View>

                {/* Render your table headers */}
                <View style={styles.headContainer}>
                    {renderTableHeaders()}
                </View>

                {/* Render your table rows */}
                {renderTableRows()}

                {/* Render pagination */}
                {renderPagination()}

                {/* Add BottomSheetModal component */}
                <RBSheet
                    ref={bottomSheetRef}
                    height={300}
                    duration={250}
                    onClose={closeBottomSheet}
                    closeOnPressBack={closeBottomSheet}
                    closeOnPressMask={closeBottomSheet}
                    closeOnDragDown={closeBottomSheet}
                >
                    {/* Content of your bottom sheet goes here */}
                    {renderBottomSheetContent()}
                </RBSheet>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50,
        marginBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    tableWrapper: {
        margin: 20,
        marginTop: 30,
    },
    table: {
        marginBottom: 16,
    },
    allHeader: {
        flex: 1,
        flexDirection: "row",
    },
    head: {
        backgroundColor: '#f1f8ff',
    },
    headText: {
        padding: 5,
        fontWeight: 'bold',
    },
    rowText: {
        margin: 6,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 16,
    },
    pageNumber: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDataMessage: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingLeft: 10,
    },
    searchButton: {
        padding: 10,
        backgroundColor: 'lightblue',
        borderRadius: 5,
        marginRight: 5,
    },
    clearButton: {
        padding: 10,
        backgroundColor: 'lightcoral',
        borderRadius: 5,
    },
    bottomSheetContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        height: '100%',
    },
    bottomSheetContent: {
        marginBottom: 20,
    },

    bottomSheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bottomSheetText: {
        fontSize: 16,
        marginBottom: 10,
    },
    bottomSheetCloseButton: {
        padding: 10,
        backgroundColor: 'lightcoral',
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    bottomSheetCloseButtonText: {
        color: 'white',
    },
    pageSizeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    pickerStyle: {
        width: 50,
        color: '#344953',
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "blue",
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        flex: 1,
        marginRight: 10,
    },
    userCity: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        flex: 1,
        marginRight: 10,
    },
    userCity: {
        flex: 1,
    },
    headContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f1f8ff',
    },
    bottomSheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomSheetUserImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },
    userInfo: {
        flex: 1,
    },
    userInfoText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default PaginatedTable;
