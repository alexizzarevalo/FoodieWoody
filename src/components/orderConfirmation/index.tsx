import React, {useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {Picker} from "@react-native-community/picker";
import {createStackNavigator} from "@react-navigation/stack";
const Stack = createStackNavigator<any>();

export default function orderConfirmation({route, navigation}:any){
  const {total} = route.params;
  const confirmarPedido = ()=> {};
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
          <TouchableHighlight style={styles.addButton}
            onPress={()=>{ navigation.navigate('AddAddress')}}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableHighlight>
          <Text style={styles.label} >Metodo de pago</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedCard}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setSelectedCard(itemValue.toString())}
            >
              <Picker.Item label={"Efectivo"} value={"Efectivo"} />
            </Picker>
          </View>
          <Text style={styles.label}>Total</Text>
          <TextInput style={styles.input} editable = {false}>Q.{total}</TextInput>
          <Button title={'Terminar pedido'} onPress={pressHandler}/>
        </ScrollView>
      </View>
    </View>
  );
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
  },
  addButton:{
    backgroundColor: '#5AE73D',
    borderRadius: 5,
    height: 30,
    width: '20%',
  },
  addButtonText: {
    color: 'white',
    textAlign:'center',
    fontSize: 17,
  }
});
