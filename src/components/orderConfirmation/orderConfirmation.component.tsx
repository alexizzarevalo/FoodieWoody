import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { styles } from '../../Style';
import { GlobalDispatch, useGlobalSelector } from '../../storage';
import { useDispatch } from 'react-redux';
import { Item } from '../../storage/global-state.interface';
import useUser from '../../hooks/useUser';
import {Picker} from '@react-native-community/picker';
import Template from './orderConfirmation.view';

interface User {
  nombre: string,
  correo: string,
  direccion: string,
  telefono: string,
}

export default function orderConfirmation(
  { route, navigation }: any) {
  const {total} = route.params
  const cart: Item[] = useGlobalSelector(({cart}) => cart)
  const dispatch: GlobalDispatch = useDispatch();
  const {user} = useUser()
  const [customerInformation, setCustomerInformation] = useState<User>({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: ''
  });
  useEffect(() => {
    if (user) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((documentSnapShot) => {
          setCustomerInformation(documentSnapShot.data() as User)
          console.log(customerInformation)
        }).catch(console.log)
    }
  }, [user]);

  const pressHandler = () => {
    const aux: {}[] = [];
    cart.map((i) => {
      aux.push({receta: 'recetas/' + i.receta_id, cantidad: i.cantidad})
    })

    //Adding format to the info
    firestore()
      .collection('ordenes')
      .add({
        user_id: 'users/' + user?.uid,
        recetas: aux
      })
      .then(() => {
        console.log('Orden added!');
      });

    dispatch({type: 'SET_CART', payload: []})
    navigation.navigate('Search')
  }
  return(
    <Template customerInformation={customerInformation} total={total} pressHandler={pressHandler} />
  )
}
