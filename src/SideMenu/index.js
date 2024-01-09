import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons, Feather, FontAwesome5 } from '@expo/vector-icons';

import DrawerItems from '../Constant/DrawerItems.js';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/Settings';
import SavedScreen from './screens/Saved';
import ReferScreen from './screens/Refer';
import Header from './Header';

const Drawer = createDrawerNavigator();

const renderDrawerIcon = (drawer) => ({ focused }) => {
    const IconComponent =
        drawer.iconType === 'Material'
            ? MaterialCommunityIcons
            : drawer.iconType === 'Feather'
                ? Feather
                : FontAwesome5;

    return (
        <IconComponent
            name={drawer?.iconName}
            size={24}
            color={focused ? '#e91e63' : 'black'}
        />
    );
};

const renderDrawerHeader = (props) => {
    const title = props?.route?.name
    return <Header screen={title} />;
};

const SideMenu = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerType="front"
                initialRouteName="Profile"
                drawerContentOptions={{
                    activeTintColor: '#e91e63',
                    itemStyle: { marginVertical: 10 },
                }}
            >
                {DrawerItems.map((drawer) => (
                    <Drawer.Screen
                        key={drawer.name}
                        name={drawer.name}
                        options={{
                            drawerIcon: renderDrawerIcon(drawer),
                            headerShown: true,
                            header: renderDrawerHeader,
                        }}
                        component={
                            drawer.name === 'Profile'
                                ? ProfileScreen
                                : drawer.name === 'Settings'
                                    ? SettingsScreen
                                    : drawer.name === 'Saved Items'
                                        ? SavedScreen
                                        : ReferScreen
                        }
                    />
                ))}
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default SideMenu;
