import React, {Component, useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Button, FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {CartStackParamList} from '../../navigation/types';
import {GlobalDispatch, useGlobalSelector} from '../../storage';
import {Item} from '../../storage/global-state.interface';
import {useDispatch} from 'react-redux';
import {styles} from '../../Style';
import firestore from '@react-native-firebase/firestore'

interface ItemDetail{
  nombre:string,
  precio:number,
  imagen:string,
}

export default function OrderCheckout(
  {route,navigation}:any) {

  const [total,setTotal] = useState(0)
  const [itemDetails,setItemDetails]=useState<ItemDetail[]>([])
  const cart:Item[] = useGlobalSelector(({cart})=>cart)
  const confirmacion = () => {navigation.navigate('OrderConfirmation', {total:total})}

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
const CartItem = (props:any) =>{
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
/*const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {

  },
  lista : {
    height : '100%',
    width : '100%',
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#F87C09'
  },
  otro : {
    height : 60,
    width : '100%',
    zIndex : 5,
    position : 'absolute',
    bottom : 5,
  },
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
});*/
