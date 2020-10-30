import React, { useState } from 'react'
import {Text, View, StyleSheet, TextInput} from 'react-native'

function Element(props: any){
    const [text, setText] = useState('');
    return(
        <View style={styles.container}>
            <View style={styles.top}>
                <Text> {props.data.tipo} </Text>
            </View>
            <View style={styles.bottom}>
            <TextInput
                style={styles.texti}
                underlineColorAndroid = "transparent"
                placeholder=""
                onChangeText={text => setText(text)}
                defaultValue={props.data.contenido}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
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

export default Element