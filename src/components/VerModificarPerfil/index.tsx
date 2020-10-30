import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

function VerModificarPerfil(props: any){

    return(
        <View style={styles.container}>
            <View style={styles.top}>
                <Text> {props.data.tipo} </Text>
            </View>
            <View style={styles.bottom}>
                <Text> {props.data.contenido} </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        marginTop : 10,
        marginBottom : 10
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
    }
  });

export default VerModificarPerfil