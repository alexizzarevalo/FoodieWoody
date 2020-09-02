import {Text, View, Button, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import React, { useState } from "react";
import {StackScreenProps} from '@react-navigation/stack';
import {CartStackParamList} from '../../navigation/types';
import OrderCheckout from '../orderCheckout';

export default function Cart({route,navigation}:StackScreenProps<CartStackParamList,'Cart'>){
  //TODO should get info from firestore
  return (<ScrollView>
    <Receta name="Limonada"></Receta>
    <Receta name="Jugo de naranja"></Receta>
    <View >
      <TouchableOpacity
        style={styles.contenedorboton}
        onPress={()=>{navigation.navigate('OrderCheckout')}}
      >
        <Text style={styles.textoboton}>Checkout</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>);
}
function Receta(props:any){
    const [amount, changeAmount] = useState(0);

    return (
        <View style={{flexDirection: "row", justifyContent: "space-evenly", padding: 5, borderBottomColor: 'lightgray',
    borderBottomWidth: 1}}>
            <View style={{flex: 0.7}}>
                <Text>
                    {props.name}
                </Text>
            </View>
            <View style={{flex: 0.1}}>
                <Button
                    title="-"
                    onPress={() => {{changeAmount(amount - 1)}}}
                    disabled={amount <= 0}
                />
            </View>
            <View style={{flex: 0.1, justifyContent: 'center'}}>
                <Text style={{textAlign: "center"}}>
                    {amount}
                </Text>
            </View>
            <View style={{flex: 0.1}}>
                <Button
                    title="+"
                    onPress={() => changeAmount(amount + 1)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  contenedorboton : {
    elevation: 8,
    backgroundColor: "#2d74ee",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin : 15,
  },
  textoboton : {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
})
