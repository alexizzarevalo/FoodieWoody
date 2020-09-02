import React from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'

function ListLayout(props){

    return(
        <View style={styles.elementos}>
            <View style={styles.ladoizquierdo}>
                <Text> {props.data.id} </Text>
                <Text> {props.data.name} </Text>
            </View>
            <View style={styles.cantidad}>
                <Text> x {props.data.cantidad} </Text>
            </View>
            <View style={styles.ladoderecho}>
                <Button title="X"></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    elementos: {
      flex: 1,
      flexDirection : 'row',
      margin: 10,
      height: 160,
      borderColor: '#cccccc',
      justifyContent: 'center',
      borderWidth: 0.5,
      borderRadius: 20,
      backgroundColor: '#FFFFFF'
    },
    ladoizquierdo : {
      flex : 1,
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    cantidad : {
      flex : 0.25,
      alignItems : 'flex-end',
      justifyContent : 'center',
    },
    ladoderecho : {
      flex : 0.25,
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginRight: 10
    }
});

export default ListLayout