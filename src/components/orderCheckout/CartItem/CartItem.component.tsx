import {GlobalDispatch} from '../../../storage';
import {useDispatch} from 'react-redux';
import {Button, Text, View} from 'react-native';
import {styles} from '../../../Style';
import React from 'react';

export default function CartItem(props:any){
  const dispatch:GlobalDispatch = useDispatch()
  const decCantidad = () => {
    dispatch({
      type:'DEC_QUANTITY',
      payload:{
        receta_id:props.receta_id,
        cantidad:props.cantidad
      }
    })
  }
  const incCantidad = () => {
    dispatch({
      type:'INC_QUANTITY',
      payload:{
        receta_id:props.receta_id,
        cantidad:props.cantidad
      }
    })
  }
  return (
    <View style={styles.cartItem}>
      <View style={{flex: 0.7}}>
        <Text>
          {props.nombre}
        </Text>
        <Text>
          {props.precio}
        </Text>
      </View>
      <View style={{flex: 0.1}}>
        <Button
          title="-"
          onPress={decCantidad}
        />
      </View>
      <View style={{flex: 0.1, justifyContent: 'center'}}>
        <Text style={{textAlign: "center"}}>
          {props.cantidad}
        </Text>
      </View>
      <View style={{flex: 0.1}}>
        <Button
          title="+"
          onPress={incCantidad}
        />
      </View>
    </View>
  );
}
