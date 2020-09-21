import React, {Component, useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Button, FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {CartStackParamList} from '../../navigation/types';
import {GlobalDispatch, useGlobalSelector} from '../../storage';
import {Item} from '../../storage/global-state.interface';
import {useDispatch} from 'react-redux';
import {styles} from '../../Style';
import firestore from '@react-native-firebase/firestore'
import CartItem from './CarItem/CarItem.component';

interface ItemDetail{
  nombre:string,
  precio:number,
  imagen:string,
}

export default function OrderCheckout({route,navigation}:StackScreenProps<CartStackParamList, 'OrderCheckout'>) {
  const [total,setTotal] = useState(0)
  const [itemDetails,setItemDetails]=useState<ItemDetail[]>([])
  const cart:Item[] = useGlobalSelector(({cart})=>cart)
  const confirmacion = () => {navigation.push('OrderConfirmation', {total})}

  useEffect(()=>{
    setItemDetails([])
    cart.map((i:Item)=>{
      firestore()
        .collection('recetas')
        .doc(i.receta_id)
        .get()
        .then((documentSanpshot)=>{
          const data = documentSanpshot.data() as ItemDetail
          const aux = itemDetails
          aux.push({
            nombre: data.nombre,
            precio: data.precio,
            imagen: data.imagen,
          })
          setItemDetails([...aux])
          calcularTotal()
        })
    })
  },[])

  useEffect(()=>{
    //Actualiza el total cada vez que el precio se actualiza
    calcularTotal()
  },[cart])

  const calcularTotal = () =>{
    let total = 0
    cart.map((item,index)=>{
      total+= item.cantidad* (itemDetails[index]!=undefined ?itemDetails[index].precio:0)
    })
    setTotal(total)
  }

  return (<View style={styles.container}>
    <FlatList
      data={cart}
      renderItem={({item,index} )=>{ return(
        <CartItem
          nombre={itemDetails[index]?.nombre}
          precio={itemDetails[index]?.precio}
          imagen={itemDetails[index]?.imagen}
          receta_id={item.receta_id}
          cantidad={item.cantidad}
        />
      )}}
      ListEmptyComponent={<Text style={{
        textAlign:'center',
        fontSize: 22,
        color:'white'}}>Vacio</Text>}
      keyExtractor={(item => item.receta_id)}
      horizontal={false}
    />
    <View style={styles.total}>
      <Text style={styles.textoTotal}>Total</Text>
      <Text style={styles.textoTotal}>{total}</Text>
    </View>
    <TouchableOpacity
      style={styles.btn}
      onPress={confirmacion}
    >
      <Text style={styles.textButton}>Confirmar Orden</Text>
    </TouchableOpacity>
  </View>)
}
