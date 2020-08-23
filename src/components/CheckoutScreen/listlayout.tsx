import React from 'react'
import {Text, View} from 'react-native'

function ListLayout(props){

    return(
        <View style={{marginTop : 5}}>
            <Text> {props.data.id} </Text>
            <Text> {props.data.name} </Text>
        </View>
    )
}

export default ListLayout