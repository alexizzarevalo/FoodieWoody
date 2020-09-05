import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { styles } from '../../Style';
import { GlobalDispatch, useGlobalSelector } from '../../storage';
import { useDispatch } from 'react-redux';
import { Item } from '../../storage/global-state.interface';
import useUser from '../../hooks/useUser';
import {Picker} from '@react-native-community/picker';

interface User {
  nombre: string,
  correo: string,
  direccion: string,
  telefono: string,
}

export default function orderConfirmation(
  { route, navigation }: any) {
  const { total } = route.params
  const cart: Item[] = useGlobalSelector(({ cart }) => cart)
  const dispatch: GlobalDispatch = useDispatch();
  const { user } = useUser()
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
      aux.push({ receta: 'recetas/' + i.receta_id, cantidad: i.cantidad })
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

    dispatch({ type: 'SET_CART', payload: [] })
    navigation.navigate('Search')
  }
  return (
    <View style={styles.container}>
      <View >
        <ScrollView>
          <Text style={styles.text_header}>Nombre</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value={customerInformation?.nombre}
          />
          <Text style={styles.text_header}>Correo</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value={customerInformation?.correo}
          />
          <Text style={styles.text_header}>Telefono</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value={customerInformation?.telefono}
          />
          <Text style={styles.text_header}>Direccion de envio</Text>
          <View style={styles.picker}>
            <Picker>
              <Picker.Item label={customerInformation?.direccion} value={customerInformation?.direccion} />
            </Picker>
          </View>
          <Text style={styles.text_header} >Metodo de pago</Text>
          <View style={styles.picker}>
            <Picker>
              <Picker.Item label={"Efectivo"} value={"Efectivo"} />
            </Picker>
          </View>
          <Text style={styles.text_header}>Total</Text>
          <TextInput style={styles.input} editable={false} value={`Q.${total}`}/>
          <TouchableHighlight style={styles.btn} onPress={pressHandler}>
            <Text style={styles.textButton}>Terminar pedido</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    </View>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginLeft:10,
    marginRight:10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#05375a',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 17,
    marginBottom:10,
  },
  picker: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 17,
    marginBottom:10,
  },
  Button : {
    elevation: 8,
    backgroundColor: "#2d74ee",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin : 15,
  },
  `textButton : {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }`
});*/
