import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { useFocusEffect } from '@react-navigation/native';
import User from '../../services/sqlite/User';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [fontLoaded] = useFonts({ Roboto_400Regular });
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  const fetchUsers = () => {
    setLoading(true);
    User.all()
      .then(users => {
        console.log('Fetched users:', users);
        const sortedUsers = users.sort((a, b) => a.service.localeCompare(b.service));
        setUsers(sortedUsers);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>Serviço: {item.service}</Text>
      <Text style={styles.text}>Nome: {item.name}</Text>
      <Text style={styles.text}>Contato: {item.phone}</Text>
    </View>
  );

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        ref={flatListRef}
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        refreshing={loading}
        onRefresh={fetchUsers}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../../../src/assets/logo.png")}
                style={styles.img}
              />
            </View>
            <Text style={styles.heading}>AVISOS</Text>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../../../src/assets/alertdengue.png")}
                style={styles.imgDengue}
              />
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../../../src/assets/alertzap.png")}
                style={styles.imgZap}
              />
            </View>
            <Text style={styles.heading}>SERVIÇOS</Text>
          </View>
        )}
        nestedScrollEnabled // Adicione isso para permitir que a FlatList aninhada role corretamente
      />
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
  scrollViewContent: {
    width: 350,
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
    fontSize: 28,
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  img: {
    width: "auto",
    height: 275,
    marginBottom: 35,
    marginTop: 15,
    resizeMode: 'contain', // Adicione esta linha para ajustar a imagem ao contêiner
  },
  imgDengue: {
    width: "auto",
    height: 370,
    marginBottom: 5,
    marginTop: 10,
    resizeMode: 'contain', // Adicione esta linha para ajustar a imagem ao contêiner
  },
  imgZap: {
    width: "auto",
    height: 370,
    marginBottom: 35,
    marginTop: 10,
    resizeMode: 'contain', // Adicione esta linha para ajustar a imagem ao contêiner
  },

});
