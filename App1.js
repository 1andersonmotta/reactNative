import React, { useState, useEffect, useRef } from 'react';
// import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList, TextInput, Button, Modal } from 'react-native';
// import { useFonts, Oswald_300Light } from '@expo-google-fonts/oswald';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import Register from './src/assets/components/Register/Register.jsx';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import User from './src/assets/services/sqlite/User.js';
/**
 * Example user Object: {
 *  id: (auto generated in sqlite), 
 *  name: 'Anderson',
 *  password: '123',
 *  service: 'marido de aluquel',
 *  phone: '15997897412'
 * } 
 */
const printUser = (user) => {
  console.log(`id:${user.id}, Nome:${user.name}, password:${user.password},Serviço:${user.service}, Contato:${user.phone}`)
}

const Tab = createBottomTabNavigator();


export default function Home() {
  const [users, setUsers] = useState([]);
  const [fontLoaded] = useFonts({ Roboto_400Regular });

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [service, setService] = useState('');
  const [phone, setPhone] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento dos serviços
  const flatListRef = useRef(null); // Referência para a FlatList
  // const [formValid, setFormValid] = useState(false);

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
        setModalVisible(false); // Fechar o modal após salvar
        setError('');
        fetchUsers(); // Recarrega os usuários após salvar
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchUsers(); // Carregar os usuários quando o componente for montado
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    User.all()
        .then(users => {
            console.log('Fetched users:', users); // Log to check the fetched users
            const sortedUsers = users.sort((a, b) => a.service.localeCompare(b.service)); // Ordenar por serviço
            setUsers(sortedUsers);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
};



  // useEffect(() => {
  //   User.all()
  //     .then(users => setUsers(users))
  //     .catch(err => console.log(err));
  // }, []);

  // //forced error catch
  // User.find(-1)
  //   .then(user => printUser(user))
  //   .catch(err => console.log(err))

  // //create
  // User.create({ name: 'anderson Motta', password: '123', service: 'dj, som e Luz', phone: '15997897412' })
  //   .then(id => console.log('User created with id: ' + id))
  //   .catch(err => console.log(err))

  // User.create({ name: 'Batman', password: '123', service: 'servir e proteger', phone: '15997897412' })
  //   .then(id => console.log('User created with id: ' + id))
  //   .catch(err => console.log(err))

  // User.create({ name: 'Marcos aurelio dos santos neves', password: '123', service: 'marido de aluguel e muito mais doque oferecido', phone: '1599789742' })
  //   .then(id => console.log('User created with id: ' + id))
  //   .catch(err => console.log(err))

  // //find id=1
  // User.find(1)
  //   .then(user => printUser(user))
  //   .catch(err => console.log(err))

  // //find name=vw
  // User.findByname('Batman')
  //   .then(users => console.log(users))
  //   .catch(err => console.log(err))

  // //update
  // User.update(4, { name: 'DeadPoll', password: '123', service: 'animador de festas', phone: 70 })
  //   .then(updated => console.log('Users updated: ' + updated))
  //   .catch(err => console.log(err))

  // //all
  // User.all()
  //   .then(
  //     users => users.forEach(c => printUser(c))
  //   )

  // //delete
  // User.remove(1)
  //   .then(updated => console.log('Users removed: ' + updated))
  //   .catch(err => console.log(err))

  // User.remove(2)
  //   .then(updated => console.log('Users removed: ' + updated))
  //   .catch(err => console.log(err))

  // User.remove(3)
  //   .then(updated => console.log('Users removed: ' + updated))
  //   .catch(err => console.log(err))

  // //forced empty array (all=[])
  // User.all()
  //   .then(
  //     users => console.log(users)
  //   )

  ///////
  const [button, setButton] = useState('Test');

  if (!fontLoaded) {
    return null;
  }

  function setButtonValue(value) {
    console.log("clicou", value);
    setButton(value);
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>Serviço: {item.service}</Text>
      <Text style={styles.text}>Nome: {item.name}</Text>
      <Text style={styles.text}>Contato: {item.phone}</Text>
    </View>
  );


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* <Modal
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
            <TextInput
              style={styles.input}
              placeholder="Contato"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={text => setPhone(text)}
            />
            <Button title="Salvar" onPress={handleSave} />
          </View>
        </View>
      </Modal> */}

      {/* <Register /> */}
      {/* <ScrollView contentContainerStyle={styles.scrollViewContent}> */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image
            source={require("./src/assets/logo.png")}
            style={styles.img}
          />
        </View>
        <Text style={styles.heading}>AVISOS</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require("./src/assets/alertdengue.png")}
            style={styles.imgDengue}
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("./src/assets/alertzap.png")}
            style={styles.imgZap}
          />
        </View>
        {/* <TouchableOpacity style={styles.button} onPress={() => setButtonValue("Serviços")}>
          <Text style={styles.buttonText}>Serviços</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setButtonValue("Produtos")}>
          <Text style={styles.buttonText}>Produtos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setButtonValue("Avisos")}>
          <Text style={styles.buttonText}>Avisos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setButtonValue("Alertas")}>
          <Text style={styles.buttonText}>Alertas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setButtonValue("Serviços e Produtos Próximos")}>
          <Text style={styles.buttonText}>Serviços e Produtos Próximos</Text>
        </TouchableOpacity> */}


        <Text style={styles.heading}>SERVIÇOS</Text>
          <FlatList
            ref={flatListRef}
            data={users}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            refreshing={loading} // Adicione esta linha para mostrar o indicador de carregamento
            onRefresh={fetchUsers} // Adicione esta linha para recarregar a lista 
          />
      </ScrollView>
    </View>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CAF50",
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  scrollViewContent:{
    width:350,
  },
  heading: {
    color: "#FFFFFF",
        fontSize: 33,
        letterSpacing: 1,
        textAlign: "left",
        paddingHorizontal: 10,
        textShadowColor: "#000",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 3,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "inherit",
  },
  text: {
    fontSize: 21,
  },
  addButton: {
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
    fontFamily: "Roboto_400Regular",
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
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    height: 50,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 18,
    shadowColor: "#000", // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Configuração do deslocamento da sombra
    shadowOpacity: 0.4, // Opacidade da sombra
    shadowRadius: 3, // Raio da sombra
    elevation: 5, // Elevação para dispositivos Android
  },
  buttonText: {
    color: "#FFFFFF", // Cor do texto dos botões
    fontSize: 28, // Tamanho da fonte ajustado para melhor legibilidade
    fontFamily: "Roboto_400Regular",
    letterSpacing: 1,
    textAlign: "center",
    paddingHorizontal: 10, // Adiciona espaço interno ao texto do botão
    textShadowColor: "#000", // Cor da sombra do texto
    textShadowOffset: { width: 0, height: 2 }, // Configuração do deslocamento da sombra do texto
    textShadowRadius: 3, // Raio da sombra do texto
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, // Esta propriedade é necessária para sombra funcionar no Android
  },
  img: {
    width: "auto",
    height: 250,
    marginBottom: 35,
    marginTop: 15,

  },
  imgDengue: {
    width: "auto",
    height: 370,
    marginBottom: 35,
    marginTop: 15,
  },
  imgZap: {
    width: "auto",
    height: 370,
    marginBottom: 35,
    marginTop: 15,
  },

});


