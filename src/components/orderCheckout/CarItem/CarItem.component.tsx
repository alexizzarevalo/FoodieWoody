import {GlobalDispatch} from '../../../storage';
import {useDispatch} from 'react-redux';
import {Button, Text, View} from 'react-native';
import {styles} from '../../../Style';
import React from 'react';

const dispatchWrapper = (
  action_type:any,
  receta_id:any,
  cantidad:any,
  dispatch:any
) => {
  dispatch({
    type: action_type,
    payload:{
      receta_id:receta_id,
      cantidad:cantidad
    }
  })
}

export default function CarItem(props:any){
  const dispatch:GlobalDispatch = useDispatch()
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
          testID={'dec_quantity'}
          title="-"
          onPress={() => {dispatchWrapper('DEC_QUANTITY',
            props.receta_id, props.cantidad, dispatch)}}
        />
      </View>
      <View style={{flex: 0.1, justifyContent: 'center'}}>
        <Text style={{textAlign: "center"}}>
          {props.cantidad}
        </Text>
      </View>
      <View style={{flex: 0.1}}>
        <Button
          testID={'inc_quantity'}
          title="+"
          onPress={() => {dispatchWrapper('INC_QUANTITY',
            props.receta_id, props.cantidad, dispatch)}}
        />
      </View>
    </View>
  );
}
