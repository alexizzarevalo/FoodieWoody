import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList } from "../../navigation/types";

export default function LoginScreen({ navigation, route }: DrawerScreenProps<DrawerParamList, 'Login'>) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef<TextInput>(null); //Para hacer referencia al Input del password

    function login() {
        Alert.alert('Login', 'Login')
    }

    function register() {
        Alert.alert('Register', 'Register')
        // TODO: Navegar hacia la pantalla de registro
        // navigation.navigate('Register');
    }

    function passwordRecovery() {
        Alert.alert('Recovery', 'Password')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Foodie Woody</Text>
            </View>
            <View style={styles.body}>
                <ScrollView>

                    <Text style={styles.label}>Correo:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"Escribe tu correo electrónico"}
                        blurOnSubmit={false} //Para que no se baje el teclado cuando presiona enter
                        value={email}
                        onChangeText={setEmail} //Guarda el nuevo estado de email
                        onSubmitEditing={() => { passwordRef.current?.focus() }} // Cuando presiona enter, se pone el focus en el textInput de password
                    />
                    <Text style={styles.label}>Contraseña:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={"Escribre tu contraseña"}
                        blurOnSubmit={true}
                        secureTextEntry={true} // Modo contraseña
                        value={password}
                        onChangeText={setPassword} //Guarda el nuevo estado de password
                        ref={passwordRef}
                        onSubmitEditing={login} // Cuando presiona enter, se ejecuta la funcion login
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

                    <View style={styles.recoveryContainer}>
                        <Text style={styles.recoveryText}>¿Se te olvido tu contraseña?</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableHighlight style={styles.recoveryButton} underlayColor='gray' onPress={passwordRecovery}>
                                <Text style={styles.buttonText}>Recuperar</Text>
                            </TouchableHighlight>
                        </View>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        paddingHorizontal: 16,
    },
    label: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 5
    },
    input: {
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 16
    },
    buttonContainer: {
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: 'yellow',
        overflow: 'hidden'
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
    },
    loginButton: {
        backgroundColor: 'blue',
    },
    registerButton: {
        backgroundColor: 'red'
    },
    recoveryButton: {
        backgroundColor: 'orange'
    },
    recoveryContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    recoveryText: {

    }
})