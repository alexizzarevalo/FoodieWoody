import {Text, View, Button, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import React, { useState } from "react";
import {StackScreenProps} from '@react-navigation/stack';
import {CartStackParamList} from '../../navigation/types';
import OrderCheckout from '../orderCheckout';
import { useDispatch } from 'react-redux'
import { GlobalDispatch } from '../../storage'
import {styles} from '../../Style'

export default function Cart({route,navigation}:StackScreenProps<CartStackParamList,'Cart'>){
  /**
   * Esta pantalla es de pruebas solo para probar la funcionalidad
   * de hacer un pedido
   */

  /* Cargando informacion de prueba*/
  const dispatch:GlobalDispatch = useDispatch()
  const add1=()=>{
    dispatch({type:'ADD_TO_CART',payload:{receta_id:'JLMlOFhyoheIjAP4uieS',cantidad:1}})
  }
  const add2=()=>{
    dispatch({type:'ADD_TO_CART',payload:{receta_id:'8XVTmvBhUULExQ8k1VZ0',cantidad:1}})
  }
  /* Fin de la informacion de prueba*/

  //TODO should get info from firestore

  return (<View style={styles.container}>
    <ScrollView>
      <View style={{marginBottom:10,marginTop:10}}>
        <Button title={'Prueba add Pizza 1'} onPress={add1}/>
      </View>
      <View style={{marginBottom:10}}>
        <Button title={'Prueba add Sopa  2'} onPress={add2}/>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{navigation.navigate('OrderCheckout')}}
      >
        <Text style={styles.btn}>Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>);
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

/*const styles = StyleSheet.create({
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

  /*import { GlobalDispatch } from '../../Store'
import { useDispatch } from "react-redux"

const dispatch: GlobalDispatch = useDispatch();

dispatch({
    type: 'ADD_TO_CART',
    payload: product
})*/
