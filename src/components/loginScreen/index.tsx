import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList } from "../../navigation/types";
import auth from "@react-native-firebase/auth";

const AuthError = {
    wrongPassword: 'auth/wrong-password',
    invalidEmail: 'auth/invalid-email',
    userNotFound: 'auth/user-not-found',
    tooManyRequests: 'auth/too-many-requests',
}

export default function LoginScreen({ }: DrawerScreenProps<DrawerParamList, 'Login'>) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef<TextInput>(null); //Para hacer referencia al Input del password

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            if (user != null) {
                console.log(user)
            } else {
                console.log('No esta logueado')
            }
        })
        return unsubscribe
    }, [auth])

    function login() {
        auth()
            .signInWithEmailAndPassword(email.trim(), password)
            .then((_)=> {
                Alert.alert('Bienvenido', 'Has iniciado sesión correctamente');
                setEmail('');
                setPassword('');
            })
            .catch((error: Error) => {
                if (error.message.includes(AuthError.wrongPassword)) {
                    Alert.alert('Contraseña incorrecta', 'La contraseña que has ingresado es incorrecta');
                } else if (error.message.includes(AuthError.invalidEmail)) {
                    Alert.alert('Correo inválido', 'Ingresa una dirección de correo válida');
                } else if (error.message.includes(AuthError.userNotFound)) {
                    Alert.alert('Cuenta no encontrada', 'No existe una cuenta con el correo especificado');
                } else if (error.message.includes(AuthError.tooManyRequests)) {
                    Alert.alert('Inicio de sesión bloqueado', 'Demasiados intentos de inicio de sesión fallidos. Por favor, inténtelo de nuevo más tarde.')
                } else {
                    Alert.alert('Error', 'No se pudo iniciar sesión. Intentalo nuevamente');
                    console.log(error)
                }
            });
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
                <Text style={styles.headerText}>Inicia Sesión</Text>
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
                        placeholder={"Escribe tu contraseña"}
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
                                <Text style={[styles.buttonText, {color: 'black', fontWeight: 'bold'}]}>Recuperar</Text>
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
        backgroundColor: '#f87c09'
    },
    header: {
        height: 180,
        backgroundColor: '#f87c09',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },
    body: {
        flex: 1,
        paddingHorizontal: 16,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white'
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#05375a',
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 5
    },
    input: {
        borderBottomWidth: 1,
        borderColor: 'gray',
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
        fontSize: 18,
        textAlign: 'center',
        padding: 10,
        color: 'white',
    },
    loginButton: {
        backgroundColor: '#f87c09',
    },
    registerButton: {
        backgroundColor: 'purple'
    },
    recoveryButton: {
        backgroundColor: 'white'
    },
    recoveryContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20
    },
    recoveryText: {

    }
})