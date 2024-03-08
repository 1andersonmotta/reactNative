import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/assets/components/Register/Register.jsx';
import Home from './App1.js';
import { Feather } from '@expo/vector-icons';


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
function StackNavigator() {
    return (
        <StackNavigator screenOptions={{ title: '' }}>
            <Stack.Screen
                name='Home'
                component={<Register />}
            />
        </StackNavigator>
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
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        // <StackNavigator screenOptions={{ title: '' }}>
        //     <Stack.Screen
        //         name='Home'
        //         component={<Register />}
        //     />
        // </StackNavigator>


        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Início"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <Feather name='home' color={color} size={size} />,
                        tabBarLabel: 'Início'
                    }}
                />
                <Tab.Screen
                    name="Serviços"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <Feather name='tool' color={color} size={size} />,
                        tabBarLabel: 'Serviços',
                    }}
                />
                <Tab.Screen
                    name="Cadastrar"
                    component={RegisterScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => <Feather name='plus' color={color} size={size} />,
                        tabBarLabel: 'Cadastrar'
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}