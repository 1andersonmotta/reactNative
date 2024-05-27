import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import User from '../../services/sqlite/User.js';

function Services() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const flatListRef = useRef(null);

    const fetchUsers = () => {
        setLoading(true);
        User.all()
            .then(users => {
                console.log('Fetched users:', users); // Log to check the fetched users
                const sortedUsers = users.sort((a, b) => a.service.localeCompare(b.service)); // Ordenar por serviço
                setUsers(sortedUsers);
                setFilteredUsers(sortedUsers); // Inicialmente, os usuários filtrados são os mesmos que os usuários
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filterUsers = (text) => {
        setSearchText(text);
        const filtered = users.filter(user => {
            return user.service.toLowerCase().includes(text.toLowerCase()) || user.name.toLowerCase().includes(text.toLowerCase());
        });
        setFilteredUsers(filtered);
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.text}>Nome: {item.name}</Text>
            <Text style={styles.text}>Serviço: {item.service}</Text>
            <Text style={styles.text}>Telefone: {item.phone}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Pesquisar por serviço ou nome"
                value={searchText}
                onChangeText={filterUsers}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#4CAF50" />
            ) : (
                <FlatList
                    data={filteredUsers}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    ref={flatListRef}
                    style={styles.flatList}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        marginTop: 30
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    item: {
        padding: 20,
        backgroundColor: "#4CAF50",
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
    },
    text: {
        color: "#FFFFFF",
        fontSize: 23,
        letterSpacing: 1,
        textAlign: "left",
        paddingHorizontal: 10,
        textShadowColor: "#000",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 3,
    },
    flatList: {
        flex: 1,
        width: '100%',
    },
});

export default Services;
