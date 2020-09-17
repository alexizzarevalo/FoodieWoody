import React,{ useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  TextInput
} from 'react-native';


declare const global: {HermesInternal: null | {}};

export default function CrearReceta(){
  const [text, setText] = useState('');
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
            <Text> Crea una receta </Text>
            <View style={styles.continput}>
                <View style={styles.top}>
                    <Text> Nombre: </Text>
                </View>
                <View style={styles.bottom}>
                <TextInput
                    style={styles.texti}
                    underlineColorAndroid = "transparent"
                    placeholder=""
                    onChangeText={text => setText(text)}
                    defaultValue=""
                />
                </View>
            </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#f87c09'
    },
    continput : {
        marginTop : 10
    },
    top : {
        flex : 1,
        justifyContent : 'flex-start',
        alignItems : 'flex-start'
    },
    bottom : {
        flex : 2,
        justifyContent : 'center',
        alignItems : 'center'
    },
    texti : {
        height : 30,
        width : '60%',
        backgroundColor : 'white',
        borderColor : 'purple',
        borderWidth : 1,
        borderRadius: 5
    }
});

