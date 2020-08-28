import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, ToastAndroid, ActivityIndicator } from "react-native";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList } from "../../navigation/types";
import auth from "@react-native-firebase/auth";
import prompt from "react-native-prompt-android";

const AuthError = {
    wrongPassword: 'auth/wrong-password',
    invalidEmail: 'auth/invalid-email',
    userNotFound: 'auth/user-not-found',
    tooManyRequests: 'auth/too-many-requests',
}

export default function LoginScreen({ navigation }: DrawerScreenProps<DrawerParamList, 'Login'>) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef<TextInput>(null); //Para hacer referencia al Input del password

    function login() {
        if (email.length === 0 || password.length === 0) {
            Alert.alert('Datos faltantes', 'Debes agregar un correo y una contraseña')
            return
        }

        setLoading(true);
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
            }).finally(() => { setLoading(false) });
    }

    function register() {
        navigation.navigate('Register');
    }

    function passwordRecovery() {
        function sendEmail(email: string) {
            auth().sendPasswordResetEmail(email.trim())
            .then(() => {
                ToastAndroid.show('Se ha enviado un enlace a ' + email + ' si existe una cuenta con ese correo', ToastAndroid.LONG);
            })
            .catch((error: Error) => {
                if (error.message.includes(AuthError.invalidEmail)) {
                    ToastAndroid.show('Ingresa una dirección de correo válida', ToastAndroid.LONG);
                } else {
                    ToastAndroid.show('No se pudo enviar el enlace. Intentalo de nuevo más tarde.', ToastAndroid.LONG);
                    console.log(error)
                }
            });
        }

        prompt(
            'Recuperar contraseña',
            'Escribe tu correo electrónico para enviarte un enlace para recuperar tu contraseña',
            [
             {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
             {text: 'OK', onPress: sendEmail},
            ],
            {
                type: 'email-address',
                cancelable: false,
                placeholder: 'ejemplo@gmail.com'
            }
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.headerText, {fontSize: 40}]}>Foodie Woody</Text>
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
                        <TouchableOpacity style={styles.loginButton} activeOpacity={0.85} onPress={login}>
                            {
                                loading ? <ActivityIndicator style={styles.buttonText} size={24} color={"white"}/>
                                : <Text style={styles.buttonText}>Iniciar sesión</Text>
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.registerButton} activeOpacity={0.85} onPress={register}>
                            <Text style={styles.buttonText}>Registrarse</Text>
                        </TouchableOpacity>
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
        fontSize: 17
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