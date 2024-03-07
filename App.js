import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from './src/assets/components/Register/Register.jsx';
import Home from './App1.js';


function HomeScreen() {
    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#AED581' }}>
            <Home />
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Register />
        </View>
    );
}

function RegisterScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Register />
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Serviços" component={SettingsScreen} />
                <Tab.Screen name="Cadastrar" component={RegisterScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}