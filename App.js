import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { useFonts, Oswald_300Light } from '@expo-google-fonts/oswald';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

export default function App() {
  const [button, setButton] = useState('Test');
  const [fontLoaded] = useFonts({ Roboto_400Regular });

  if (!fontLoaded) {
    return null;
  }

  function setButtonValue(value) {
    console.log("clicou", value);
    setButton(value);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image
            source={require("./src/assets/logo.png")}
            style={styles.img}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => setButtonValue("Serviços")}>
          <Text style={styles.buttonText}>Serviços</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setButtonValue("Produtos")}>
          <Text style={styles.buttonText}>Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setButtonValue("Cadastrar / Excluir")}>
          <Text style={styles.buttonText}>Cadastrar / Excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setButtonValue("Avisos")}>
          <Text style={styles.buttonText}>Avisos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setButtonValue("Alertas")}>
          <Text style={styles.buttonText}>Alertas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setButtonValue("Serviços e Produtos Próximos")}>
          <Text style={styles.buttonText}>Serviços e Produtos Próximos</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// const styles = StyleSheet.create({
//   imageContainer: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 4,
//     elevation: 5, // Esta propriedade é necessária para sombra funcionar no Android
//   },
//   img: {
//     width: 200,
//     height: 190,
//     marginBottom: 15,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#C0EC9F',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//     marginTop: 30
//   },
//   scrollViewContent: {
//     alignItems: 'center',
//     paddingTop: 10,
//   },
//   button: {
//     backgroundColor: "#392de9",
//     width: "80%", // Definindo a largura do botão como 80% da largura do container
//     height: 72,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 8,
//     marginBottom: 18,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 24,
//     fontFamily: "Oswald_300Light",
//     letterSpacing: 1,
//     textAlign: "center",
//     textShadowColor: "black",
//     textShadowRadius: 15,
//   }
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AED581', // Cor de fundo suave e acolhedora
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 30
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingTop: 10,
  },
  button: {
    backgroundColor: "#4CAF50", // Cor verde vibrante para os botões
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
    width: 290,
    height: 290,
    marginBottom: 15,
  },
});


