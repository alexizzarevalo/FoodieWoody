import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

function Element(props: any){

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

export default Element