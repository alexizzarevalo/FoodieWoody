import React, {
  Component,
  Dispatch,
  DispatchWithoutAction,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { View, Text, TouchableOpacity, Button, FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {CartStackParamList} from '../../navigation/types';
import {GlobalDispatch, useGlobalSelector} from '../../storage';
import {Item} from '../../storage/global-state.interface';
import {useDispatch} from 'react-redux';
import {styles} from '../../Style';
import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import CarItem from './CarItem/CarItem.component';
import Template from './orderCheckout.view';
import {getRecetas} from '../SearchScreen/state';

interface ItemDetail{
  nombre:string,
  precio:number,
  imagen:string,
}

const calcularTotal = (cart:Item[],
                       itemDetails:ItemDetail[],
                       setTotal:Dispatch<SetStateAction<any>>) => {
  let total = 0
  cart.map((item,index)=>{
    total += item.cantidad * (itemDetails[index] != undefined ? itemDetails[index].precio : 0)
  })
  setTotal(total)
}

const first_page = (cart:Item[],itemDetails:ItemDetail[],
                    setItemDetails:Dispatch<SetStateAction<any>>,
                    setTotal:Dispatch<SetStateAction<any>>) => {
  cart.map((i:Item)=>{
    getReceta(i.receta_id)
      .then((documentSanpshot) =>{
        const data = documentSanpshot.data() as ItemDetail
        const aux = itemDetails
        aux.push({
          nombre: data.nombre,
          precio: data.precio,
          imagen: data.imagen,
        })
        setItemDetails([...aux])
        calcularTotal(cart,itemDetails,setTotal)
      })
  })
}

const getReceta = (receta_id:any):Promise<FirebaseFirestoreTypes.DocumentSnapshot> => {
  return new Promise((resolve) => {
    firestore()
      .collection('recetas')
      .doc(receta_id)
      .get()
      .then(resolve)
  })
}

export default function OrderCheckout({route,navigation}:StackScreenProps<CartStackParamList, 'OrderCheckout'>) {
  const [total,setTotal] = useState(0)
  const [itemDetails,setItemDetails]=useState<ItemDetail[]>([])
  const cart:Item[] = useGlobalSelector(({cart})=>cart)
  const confirmacion = () => {navigation.push('OrderConfirmation', {total})}

  useEffect(()=>{
    //Carga la informacion de las recetas en el carrito
    first_page(cart,itemDetails,setItemDetails,setTotal)
  },[])

  useEffect(()=>{
    //Actualiza el total cada vez que los elementos en el carrito aumentan o disminuyen
    calcularTotal(cart, itemDetails, setTotal)
  },[cart])

  return(
    <Template cart={cart} itemDetails={itemDetails} total={total} confirmacion={confirmacion}/>
  )
}
