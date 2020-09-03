import React, { useState, useRef } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import auth from "@react-native-firebase/auth";
import prompt from "react-native-prompt-android";
import { DrawerParamList } from "../../navigation/types";
import {
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
  StatusBar,
  Image,
  Alert
} from 'react-native';
import {} from '@react-navigation/drawer';

import {createStackNavigator} from '@react-navigation/stack';
import {styles} from '../../Style'

export default function RegisterN({ navigation }: DrawerScreenProps<DrawerParamList, 'Register'>) {
  const Stack = createStackNavigator();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordC, setPasswordC] = useState('');
  const pswConf = useRef<TextInput>(null);
  const psw = useRef<TextInput>(null);
  
  function signIn() {
    if(email === '' || password === '' || passwordC === '') {
      Alert.alert('Campos obligatorios', 'Todos los campos son obligatorios')
      return;
    }
    if(password !== passwordC) {
      Alert.alert('Contraseñas','Las contraseñas no coinciden')
      return;
    }else {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user.updateProfile({
          displayName: email
        })
        console.log('User registered successfully!')
        console.log(res.user);
        //navigation.navigate('Login')
      })
      .catch((error:Error) => {
        Alert.alert("Error" , "Error al registrar usuario. "+ error.message);
      })      
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#f87c09' barStyle="light-content"/>
      <View style = {styles.header}>
        <Image
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        <Text style={styles.text_header}>¡Registrate Ahora!</Text>
      </View>
      <View style = {styles.footer}>
      <ScrollView>
            <Text style={styles.text_footer}>Correo</Text>
            <View style={styles.action}>
                
                <TextInput 
                    placeholder="Correo Electrónico"
                    style={styles.textInput}
                    autoCapitalize="none"
                    blurOnSubmit={false} //Para que no se baje el teclado cuando presiona enter
                    value={email}
                    onChangeText={setEmail} //Guarda el nuevo estado de email
                    onSubmitEditing={() => { psw.current?.focus() }}
                    //autoCompleteType = {"email"}
                    // onChangeText={(val) => textInputChange(val)}
                />
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Contraseña</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Contraseña"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={setPassword} 
                    ref ={psw}
                    secureTextEntry = {true}
                    onSubmitEditing={() => { pswConf.current?.focus() }} 
                />
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirma tu contraseña</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Confirma tu contraseña"
                    style={styles.textInput}
                    autoCapitalize="none"
                    ref = {pswConf}
                    onChangeText={setPasswordC} 
                    secureTextEntry = {true}
                    onSubmitEditing={signIn}
                />
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    onPress={ signIn}
                    style={[styles.signIn, {
                        borderColor: '#f87c09',
                        borderWidth: 1
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#f87c09'
                    }]}>Registrame</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
      </View>
    </View>
  );
}
