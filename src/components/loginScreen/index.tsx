import React from "react";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function LoginScreen() {
    function login() {
        Alert.alert('Login', 'Login')
    }

    function register() {
        Alert.alert('Register', 'Register')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.body}>
                <ScrollView>

                    <Text style={styles.label}>Correo:</Text>
                    <TextInput
                        style={styles.input}
                    />
                    <Text style={styles.label}>Contraseña:</Text>
                    <TextInput
                        style={styles.input}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableHighlight style={styles.loginButton} underlayColor='gray' onPress={login}>
                            <Text style={styles.buttonText}>Iniciar sesión</Text>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableHighlight style={styles.registerButton} underlayColor='gray' onPress={register}>
                            <Text style={styles.buttonText}>Registrarse</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'orange'
    },
    header: {
        height: 180,
        backgroundColor: 'green',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
    },
    body: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 18,
    },
    input: {
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10
    },
    buttonContainer: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: 'yellow',
        overflow: 'hidden'
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10
    },
    loginButton: {
        backgroundColor: 'blue',
    },
    registerButton: {
        backgroundColor: 'red'
    }
})