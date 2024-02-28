import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function App() {
  const [button, setButton] = useState('Test')

  function setButtonValue(value) {
    console.log("clicou", value)
    return setButton(value);
  }


  return (
    <View style={styles.container}>
      <Image
        source={require("./src/assets/logo.png")}
      />
      <Text style={{ fontSize: 25 }}>Serviços, Produtos e muito mais!!</Text>
      <StatusBar style="auto" />


      <TouchableOpacity style={styles.button} onPress={() => setButtonValue("Serviços")}>
        <Text style={styles.buttonText}>Serviços</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setButtonValue("Produtos")}>
        <Text style={styles.buttonText}>Produtos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setButtonValue("Cadastrar")}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>


      <Text>{button} botao</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "#392de9",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 18
  },
  buttonText: {
    color: "#fff",
    fontSize: 20
  }
});
