import React, { useState, useRef } from "react";
import { DrawerScreenProps, DrawerNavigationProp } from "@react-navigation/drawer";
import { firebase } from "@react-native-firebase/auth";
import { DrawerParamList } from "../../navigation/types";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    TouchableHighlight,
    StatusBar,
    Alert,
    ActivityIndicator,
    Button
} from 'react-native';
import { styles} from '../../Style';
import Icon from 'react-native-vector-icons/AntDesign';

import {firebase as firebaseFirestore, FirebaseFirestoreTypes} from '@react-native-firebase/firestore'

//import { firestore as firebaseFirestore } from '../../firebaseConfig';
//import "firebase/firestore"


const AuthError = {
    emailExist : 'email-already-in-use',
    weakPassword: 'weak-password',
    invaidEmail: 'invalid-email'
}

export function register(email: string, password: string) {
    return new Promise((resolve, reject) => {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(resolve)
            .catch(reject);
    })
}

//export function saveData(id:string, name: string, phone: string){
function saveData(uid:string, email:string, name: string, phone: string){
    return new Promise((resolve, reject)=>{
        firebaseFirestore.firestore()
        .collection('users')
        .doc(uid)
        .set({
            correo: email,
            nombre: name,
            rol: 'negocio',
            telefono: phone
          });
    })
}

//Manejo de estados de drawer
export function useElements({ navigation }: { navigation: DrawerNavigationProp<DrawerParamList, "RegistroNegocio"> }) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordc, setPasswordc] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');

    //Referencias para focus
    const passwordRef = useRef<TextInput>(null);
    const passwordcRef = useRef<TextInput>(null);
    const nombredRef = useRef<TextInput>(null);
    const telefonodRef = useRef<TextInput>(null);

    //Eventos de cambio de inputs
    const handleEmailChange = (email: string) => {
        setEmail(email);
    }
    const handlePasswordChange = (password: string) => {
        setPassword(password);
    };
    const handlePasswordCChange = (passwordc: string) => {
        setPasswordc(passwordc);
    };
    const handleTelefonoChange = (telefono: string) => {
        setTelefono(telefono);
    };
    const handleNombreChange = (Nombre: string) => {
        setNombre(Nombre);
    };
    
    //eventos de cambio de foco
    const focusPasswordField = () => { passwordRef.current?.focus() }
    const focusPasswordcField = () => { passwordcRef.current?.focus() }
    const focusTelefonoField = () => { telefonodRef.current?.focus() }
    const focusNombreField = () => { nombredRef.current?.focus() }

    //Para ir a pagina de login
    const goToLogin = () => navigation.navigate('Login');

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
        passwordcField: {
            onChangeText: handlePasswordCChange,
            value: passwordc,
            focus: focusPasswordcField,
            ref: passwordcRef
        },
        telefonoField:{
            onChangeText: handleTelefonoChange,
            value: telefono,
            focus: focusTelefonoField,
            ref: telefonodRef
        },
        nombreField:{
            onChangeText: handleNombreChange,
            value: nombre,
            focus: focusNombreField,
            ref: nombredRef
        },
        loading: {
            value: loading,
            change: setLoading
        },
        goToLogin
    }
}

//render de la pantallla
export default function Registronegocio({ navigation }: DrawerScreenProps<DrawerParamList, 'RegistroNegocio'>) {
    //let ref = firebaseFirestore.firestore().collection('users');
    const { emailField, passwordField, passwordcField, telefonoField, nombreField, loading, goToLogin } = useElements({ navigation });

    function registrar(){
        if (emailField.value.length === 0 || passwordField.value.length === 0 || passwordcField.value.length == 0 || telefonoField.value.length == 0 || nombreField.value.length == 0 ) {
            Alert.alert('Datos faltantes', 'Todos los datos son obligatorios')
            return
        }else if(passwordField.value != passwordcField.value){
            Alert.alert('Datos incorrectos', 'Contraseñas no coinciden')
            return
        }
        loading.change(true);
        //Alert.alert('Usuario Registrado', 'Inicie Sesion')
        //navigation.navigate('Login'); 
        //return //descomentar este return, esto es porque no se ha implementado prueba de registro
        //llamo a mi funcion de registrar, devuelve un promise de la funcion de crearusuarioconemailycontrase;a de auth
        register(emailField.value.trim(), passwordField.value)
            .then((res:any) => {
                //guardarlos datos de empresa con firebase
                saveData(res.user.uid, emailField.value.trim(), nombreField.value.trim(), telefonoField.value.trim())
            })
            .catch((error: Error) => {
                //errores, estos estan guardados en el array AuthError para fines practicos
                if (error.message.includes(AuthError.emailExist)) {
                    Alert.alert('Correo ya exisste', 'El correo ingresado ya se encuentra regisstrado');
                } else if (error.message.includes(AuthError.invaidEmail)) {
                    Alert.alert('Correo inválido', 'Ingresa una dirección de correo válida');
                } else if (error.message.includes(AuthError.weakPassword)) {
                    Alert.alert('Contraseña incorrecta', 'La contraseña ingresada es muy debil');
                }  else {
                    Alert.alert('Error', 'Error  al crear registro, intente nuevamente');
                }
            }).finally(()=>{
                loading.change(false);
            })
    }

    return(<View style={styles.container}>
                <StatusBar backgroundColor='#f87c09' barStyle="light-content"/>
                <View style = {[styles.header, {flex: 1, flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'}]}>
                    <Text style={styles.text_header}>¡Registra tu Negocio!</Text>
                    {/* <Button title="Crear" onPress={registrar}></Button> */}
                    <Icon testID="registerIcon" name="plus" size={40} onPress={registrar}></Icon>
                </View>
                <View style = {styles.footer}>
                <ScrollView>
                    <Text style={styles.labelbold}>Correo:</Text>
                    <TextInput
                        testID="email"
                        style={styles.input}
                        placeholder={"Escribe tu correo electrónico"}
                        blurOnSubmit={false} //Para que no se baje el teclado cuando presiona enter
                        value = {emailField.value}
                        onChangeText = {emailField.onChangeText}
                        onSubmitEditing ={passwordField.focus}
                    />
                    <Text style={styles.labelbold}>Contraseña:</Text>
                    <TextInput
                        testID="password"
                        style={styles.input}
                        placeholder={"Escribe tu contraseña"}
                        blurOnSubmit={false}
                        secureTextEntry={true} // Modo contraseña
                        ref = {passwordField.ref}
                        value = {passwordField.value}
                        onChangeText = {passwordField.onChangeText}
                        onSubmitEditing ={passwordcField.focus}
                    />
                    <Text style={styles.labelbold}>Confirma Contraseña:</Text>
                    <TextInput
                        testID="passwordc"
                        style={styles.input}
                        placeholder={"Escribe tu contraseña"}
                        blurOnSubmit={false}
                        ref = {passwordcField.ref}
                        secureTextEntry={true} // Modo contraseña
                        value = {passwordcField.value}
                        onChangeText = {passwordcField.onChangeText}
                        onSubmitEditing ={nombreField.focus}
                    />
                    <Text style={styles.labelbold}>Nombre de Negocio:</Text>
                    <TextInput
                        testID="nombre"
                        style={styles.input}
                        placeholder={"Negocio"}
                        blurOnSubmit={false}
                        ref = {nombreField.ref}
                        value = {nombreField.value}
                        onChangeText = {nombreField.onChangeText}
                        onSubmitEditing ={telefonoField.focus}
                    />
                    <Text style={styles.labelbold}>Teléfono:</Text>
                    <TextInput
                        testID="telefono"
                        style={styles.input}
                        placeholder={"Teléfono"}
                        blurOnSubmit={false}
                        ref = {telefonoField.ref}
                        value = {telefonoField.value}
                        onChangeText = {telefonoField.onChangeText}
                    />
                    <View style={styles.button}>
                        <TouchableOpacity testID="registrar" style={styles.buttonWarning} activeOpacity={0.85} onPress={registrar}>
                            {
                                loading.value ? <ActivityIndicator testID="activityIndicator" style={styles.buttonText} size={24} color={"white"} />
                                    : <Text testID="loginButtonText" style={styles.buttonText}>Registrate</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.textCenter}>¿Ya tienes cuenta?</Text>
                        <TouchableHighlight testID="redirectLogin"  underlayColor='gray' onPress={goToLogin}>
                            <Text style={styles.labelbold} >Inicia Sesión</Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
                </View>
            </View>
);
}
