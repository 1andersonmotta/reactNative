import { View, Input, Text, TextInput, ImageBackground, StyleSheet } from "react-native";
import { useState } from "react";
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';

function Register() {
    const [fontLoaded] = useFonts({ Roboto_400Regular });
    if (!fontLoaded) {
        return null;
    }
    // const [name, setName] = useState("")
    return (
        <View >

            <Text style={styles.text}>Olá </Text>
            {/* <TextInput style={styles.input} placeholder="Email ou Usuario" onChangeText={setName()} /> */}


            {/* <ScrollView>
                <View>
                    <Input>
                        Titulo do Serviço ou Produto
                    </Input>
                </View>
            </ScrollView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff", // Cor verde vibrante para os botões
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
    text: {
        color: "#FFFFFF", // Cor do texto dos botões
        fontSize: 28, // Tamanho da fonte ajustado para melhor legibilidade
        fontFamily: "Roboto_400Regular",
        letterSpacing: 1,
        textAlign: "center",
        paddingHorizontal: 10, // Adiciona espaço interno ao texto do botão
        textShadowColor: "#000", // Cor da sombra do texto
        textShadowOffset: { width: 0, height: 2 }, // Configuração do deslocamento da sombra do texto
        textShadowRadius: 3, // Raio da sombra do texto
    }
});

export default Register;