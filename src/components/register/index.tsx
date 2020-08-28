import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  View, 
  Text, 
  Button, 
  TouchableOpacity, 
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Alert
} from 'react-native';
import {} from '@react-navigation/drawer';

import {createStackNavigator} from '@react-navigation/stack';
import {styles} from '../../Style'

// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const Stack = createStackNavigator();

export default function RegisterN() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Register'} component={Register} />
    </Stack.Navigator>
  );
}

function Register() {
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
            <Text style={styles.text_footer}>Usuario</Text>
            <View style={styles.action}>
                
                <TextInput 
                    placeholder="Nombre de usuario"
                    style={styles.textInput}
                    autoCapitalize="none"
                    // onChangeText={(val) => textInputChange(val)}
                />
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Contraseña</Text>
            <View style={styles.action}>
                {/* <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                /> */}
                <TextInput 
                    placeholder="Contraseña"
                    style={styles.textInput}
                    autoCapitalize="none"
                    // onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    // onPress={updateSecureTextEntry}
                >
                    
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirma tu contraseña</Text>
            <View style={styles.action}>
                {/* <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                /> */}
                <TextInput 
                    placeholder="Confirma tu contraseña"
                    // secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    // onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    // onPress={updateConfirmSecureTextEntry}
                >
                    {/* {data.secureTextEntry ?  */}
                    
                </TouchableOpacity>
            </View>
            {/* <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    Al registrarte estas aceptando nuestros
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terminos de servicio</Text>
                <Text style={styles.color_textPrivate}>{" "}y</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Políticas de privacidad</Text>
            </View> */}
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {signIn}}
                >
                {/* <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient> */}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => signIn}
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

function signIn(){
    Alert.alert(
        'Alert Title',
        'My Alert Msg',
        [
          {
            text: 'Ask me later',
            onPress: () => console.log('Ask me later pressed')
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
}