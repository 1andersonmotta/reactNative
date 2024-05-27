import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Button, Modal, Platform, Alert } from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { TextInputMask } from 'react-native-masked-text';
import User from '../../services/sqlite/User.js';

function Register() {
    const [users, setUsers] = useState([]);
    const [fontLoaded] = useFonts({ Roboto_400Regular });
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [service, setService] = useState('');
    const [phone, setPhone] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef(null);

    const handleSave = () => {
        if (!name || !password || !service || !phone) {
            setError('Todos os campos são obrigatórios');
            return;
        }

        const newUser = {
            name: name,
            password: password,
            service: service,
            phone: phone
        };

        User.create(newUser)
            .then(id => {
                console.log('User created with id: ' + id);
                setModalVisible(false);
                setError('');
                fetchUsers();
                Alert.alert('Sucesso', 'Usuário criado com sucesso! Navegue até a aba de Serviços e veja seu cadastro.');
            })
            .catch(err => console.log(err));
    };

    const fetchUsers = () => {
        setLoading(true);
        User.all()
            .then(users => {
                console.log('Fetched users:', users); // Log to check the fetched users
                setUsers(users);
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

    return (
        <View >
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>Cadastrar Serviço</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Serviço"
                            value={service}
                            onChangeText={text => setService(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            value={name}
                            onChangeText={text => setName(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                        <TextInputMask
                            style={styles.input}
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }}
                            placeholder="Contato"
                            value={phone}
                            onChangeText={text => setPhone(text)}
                        />
                        <View style={styles.modalbtn}>
                            <Button color={"#4CAF50"} title="Salvar" onPress={handleSave} />
                            <Button color={"#4CAF50"} title="Cancelar" onPress={() => {
                                setModalVisible(false);
                            }} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 16,
    },
    input: {
        backgroundColor: '#FFF',
        height: 50,
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    addButton: {
        backgroundColor: "#4CAF50",
        width: "100%",
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 18,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    addButtonText: {
        color: "#FFFFFF",
        fontSize: 28,
        fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto',
        letterSpacing: 1,
        textAlign: "center",
        paddingHorizontal: 10,
        textShadowColor: "#000",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 3,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        width: '80%',
        padding: 20,
        borderRadius: 8,
    },
    modalbtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Register;
