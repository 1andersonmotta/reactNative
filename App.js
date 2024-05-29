import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Register from './src/assets/components/Register/Register.jsx';
import Services from './src/assets/components/Register/Services.jsx';
import Home from './src/assets/components/Register/Home.jsx';

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#4CAF50" }}>
            <Home />
        </View>
    );
}

function ServicesScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Services />
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
                    component={ServicesScreen}
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
