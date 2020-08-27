import React, {useState} from 'react';
import {Button,ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Picker} from "@react-native-community/picker";
import {createStackNavigator} from "@react-navigation/stack";
const Stack = createStackNavigator<any>();

export default function orderConfirmationNavigation() {
  return (
      <Stack.Navigator>
        <Stack.Screen name={'Confirmation'} component={orderConfirmation} />
        <Stack.Screen name={'AddAddress'} component={addAddressView} />
        <Stack.Screen name={'AddCard'} component={addCardView} />
      </Stack.Navigator>
  );
}

const orderConfirmation = ({route, navigation}:any) => {
  //const {total} = route.params;
  const confirmarPedido = ()=> {};
  const addCard = () => {};
  const addAddress = () => {};
  const [selectedDirection, setSelectedDirection] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [costumerInformation, setCostumerInformation] = useState(
      {
        name: 'Cristian Castellanos',
        direcciones:[
          {key: 1,
            direccion: "31 calle 21-29, colonia Santa Elisa, zona 12"},
          {key: 2,
            direccion: "32 calle 21-30, colonia Santa Elisa, zona 12"}
        ],
        tarjetas:[
          {key:3,numero:'6434'},
          {key:4,numero:'4515'},
        ]
      }
  );
  const pressHandler = () =>{ navigation.navigate('Cart') }
  return(
    <View style={styles.container}>
      <View style={styles.body}>
        <ScrollView>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            editable = {false}
          >
            {costumerInformation.name}
          </TextInput>
          <Text style={styles.label} >Direccion de envio</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedDirection}
              onValueChange={(itemValue, itemIndex) => setSelectedDirection(itemValue.toString())}
            >
              {costumerInformation.direcciones.map((d)=>{
                return(
                  <Picker.Item label={d.direccion} value={d.direccion} key={d.key} />
                );
              })}
            </Picker>
          </View>
          <Text style={styles.label} >Metodo de pago</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedCard}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setSelectedCard(itemValue.toString())}
            >
              {costumerInformation.tarjetas.map((t)=>{
                return(
                  <Picker.Item label={"*******"+t.numero} value={t.key} key={t.key} />
                );
              })}
            </Picker>
          </View>
          <Text style={styles.label}>Total</Text>
          {/*<TextInput style={styles.input} editable = {false}>Q.{total}</TextInput>**/}
          <Button title={'Terminar pedido'} onPress={pressHandler}/>
        </ScrollView>
      </View>
    </View>
  );
}
const addAddressView = () =>{
  return <View><Text>Hello add Address</Text></View>
}
const addCardView = () =>{
  return <View><Text>Hello add Card</Text></View>
}
const styles = StyleSheet.create({
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
  }
});
