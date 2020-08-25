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
  Image
} from 'react-native';

// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const Drawer = createDrawerNavigator();


export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerType={'back'}>
        <Drawer.Screen name={'Register'} component={ExampleLogin} />
        {/*Agregar aqui las demas pantallas*/}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function ExampleLogin() {
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
                    placeholder="Contrase;a"
                    // secureTextEntry={data.secureTextEntry ? true : false}
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
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    Al registrarte estas aceptando nuestros
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terminos de servicio</Text>
                <Text style={styles.color_textPrivate}>{" "}y</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Políticas de privacidad</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {}}
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
                    // onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#f87c09',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#f87c09'
                    }]}>Sign In</Text>
                </TouchableOpacity>
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
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: Platform.OS === 'ios' ? 3 : 5,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  textPrivate: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 20
  },
  color_textPrivate: {
      color: 'grey'
  }
});