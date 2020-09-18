import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, ToastAndroid, ActivityIndicator } from "react-native";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { DrawerNavigationProp, DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList } from "../../navigation/types";
import { firebase } from "@react-native-firebase/auth";
import * as prompt from "react-native-prompt-android";

const AuthError = {
    wrongPassword: 'auth/wrong-password',
    invalidEmail: 'auth/invalid-email',
    userNotFound: 'auth/user-not-found',
    tooManyRequests: 'auth/too-many-requests',
}

export function sendEmail(email: string) {
    firebase
        .auth()
        .sendPasswordResetEmail(email.trim())
        .then(() => {
            ToastAndroid.show('Se ha enviado un enlace a ' + email + ' si existe una cuenta con ese correo', ToastAndroid.LONG);
        })
        .catch((error: Error) => {
            if (error.message.includes(AuthError.invalidEmail)) {
                ToastAndroid.show('Ingresa una dirección de correo válida', ToastAndroid.LONG);
            } else {
                ToastAndroid.show('No se pudo enviar el enlace. Intentalo de nuevo más tarde.', ToastAndroid.LONG);
            }
        });
}

export function passwordRecovery() {
    prompt.default(
        'Recuperar contraseña',
        'Escribe tu correo electrónico para enviarte un enlace para recuperar tu contraseña',
        [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'OK', onPress: sendEmail },
        ],
        {
            type: 'email-address',
            cancelable: false,
            placeholder: 'ejemplo@gmail.com'
        }
    );
}



export function signIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(resolve)
            .catch(reject);
    })
}

export function useElements({ navigation }: { navigation: DrawerNavigationProp<DrawerParamList, "Login"> }) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef<TextInput>(null);

    const handleEmailChange = (email: string) => {
        setEmail(email);
    }

    const handlePasswordChange = (password: string) => {
        setPassword(password);
    };

    const focusPasswordField = () => { passwordRef.current?.focus() }

    const goToRegister = () => navigation.navigate('Register')

    return {
        emailField: {
            onChangeText: handleEmailChange,
            value: email
        },
        passwordField: {
            onChangeText: handlePasswordChange,
            value: password,
            focus: focusPasswordField,
            ref: passwordRef
        },
        loading: {
            value: loading,
            change: setLoading
        },
        goToRegister,
    }
}

export default function LoginScreen({ navigation }: DrawerScreenProps<DrawerParamList, 'Login'>) {
    const { loading, emailField, passwordField, goToRegister } = useElements({ navigation });

    function login() {
        if (emailField.value.length === 0 || passwordField.value.length === 0) {
            Alert.alert('Datos faltantes', 'Debes agregar un correo y una contraseña')
            return
        }
        loading.change(true);
        signIn(emailField.value.trim(), passwordField.value)
            .then(() => {
                Alert.alert('Bienvenido', 'Has iniciado sesión correctamente');
                emailField.onChangeText('');
                passwordField.onChangeText('');
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
                }
            }).finally(() => { loading.change(false) })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.headerText, { fontSize: 40 }]}>Foodie Woody</Text>
                <Text style={styles.headerText}>Inicia Sesión</Text>
            </View>
            <View style={styles.body}>
                <ScrollView>

                    <Text style={styles.label}>Correo:</Text>
                    <TextInput
                        testID="emailInput"
                        style={styles.input}
                        placeholder={"Escribe tu correo electrónico"}
                        blurOnSubmit={false} //Para que no se baje el teclado cuando presiona enter
                        value={emailField.value}
                        onChangeText={emailField.onChangeText} //Guarda el nuevo estado de email
                        onSubmitEditing={passwordField.focus} // Cuando presiona enter, se pone el focus en el textInput de password
                    />
                    <Text style={styles.label}>Contraseña:</Text>
                    <TextInput
                        testID="passwordInput"
                        style={styles.input}
                        placeholder={"Escribe tu contraseña"}
                        blurOnSubmit={true}
                        secureTextEntry={true} // Modo contraseña
                        value={passwordField.value}
                        onChangeText={passwordField.onChangeText} //Guarda el nuevo estado de password
                        ref={passwordField.ref}
                        onSubmitEditing={login} // Cuando presiona enter, se ejecuta la funcion login
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity testID="loginButton" style={styles.loginButton} activeOpacity={0.85} onPress={login}>
                            {
                                loading.value ? <ActivityIndicator testID="activityIndicator" style={styles.buttonText} size={24} color={"white"} />
                                    : <Text testID="loginButtonText" style={styles.buttonText}>Iniciar sesión</Text>
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.registerButton} activeOpacity={0.85} onPress={goToRegister}>
                            <Text style={styles.buttonText}>Registrarse</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.recoveryContainer}>
                        <Text style={styles.recoveryText}>¿Se te olvido tu contraseña?</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableHighlight testID="recoveryButton" style={styles.recoveryButton} underlayColor='gray' onPress={passwordRecovery}>
                                <Text testID="recoveryButtonText" style={[styles.buttonText, { color: 'black', fontWeight: 'bold' }]}>Recuperar</Text>
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


        // firebase.auth()
        //     // auth()
        //     .signInWithEmailAndPassword(email.trim(), password)
        //     .then((data) => {
        //         console.log(data)
        //         Alert.alert('Bienvenido', 'Has iniciado sesión correctamente');
        //         setEmail('');
        //         setPassword('');
        //     })
        //     .catch((error: Error) => {
        //         if (error.message.includes(AuthError.wrongPassword)) {
        //             Alert.alert('Contraseña incorrecta', 'La contraseña que has ingresado es incorrecta');
        //         } else if (error.message.includes(AuthError.invalidEmail)) {
        //             Alert.alert('Correo inválido', 'Ingresa una dirección de correo válida');
        //         } else if (error.message.includes(AuthError.userNotFound)) {
        //             Alert.alert('Cuenta no encontrada', 'No existe una cuenta con el correo especificado');
        //         } else if (error.message.includes(AuthError.tooManyRequests)) {
        //             Alert.alert('Inicio de sesión bloqueado', 'Demasiados intentos de inicio de sesión fallidos. Por favor, inténtelo de nuevo más tarde.')
        //         } else {
        //             Alert.alert('Error', 'No se pudo iniciar sesión. Intentalo nuevamente');
        //             console.log(error)
        //         }
        //     }).finally(() => { setLoading(false) });