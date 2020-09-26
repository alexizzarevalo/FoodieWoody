import React, { useState, useRef } from "react";
import { DrawerScreenProps, DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../../navigation/types";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableHighlight,
  StatusBar,
  Image,
  Alert
} from 'react-native';
import {styles} from '../../Style'



export function validarCampos(email:string, password:string, passwordc:string, name:string, phone:string){
    let message = '';
    if(email.trim().length ==0 || password.trim().length ==0 || passwordc.trim().length ==0 || name.trim().length ==0 || phone.trim().length ==0){
        message = 'Campos Obligatorios'
    }else if(password != passwordc){
        message = 'Las contraseñas no coinciden'
    }else{
        return true;
    }
    Alert.alert("Error en datos", message)
    return false;

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
    const { emailField, passwordField, passwordcField, telefonoField, nombreField, loading, goToLogin } = useElements({ navigation });

    function registrar(email:string, password:string){
        if (emailField.value.length === 0 || passwordField.value.length === 0 || passwordcField.value.length == 0 || telefonoField.value.length == 0 || nombreField.value.length == 0 ) {
            Alert.alert('Datos faltantes', 'Todos los datos son obligatorios')
            return
        }
    }

    return(<View style={styles.container}>
                <StatusBar backgroundColor='#f87c09' barStyle="light-content"/>
                <View style = {styles.header}>
                    <Text style={styles.text_header}>¡Registrate tu Negocio!</Text>
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
                            <Text style={styles.buttonText}>Registrarse</Text>
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
