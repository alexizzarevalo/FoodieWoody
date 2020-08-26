import React, {useState} from 'react';
import {Button,ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Picker} from "@react-native-community/picker";

export default function orderConfirmation({route, navigation}:any) {
  const [selectedValue, setSelectedValue] = useState("");
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
  const {total} = route.params
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
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue.toString())}
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
            <TextInput style={styles.input} editable = {false}>{total}</TextInput>
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
  label:{

  },
  input:{
    height:40,
    borderWidth:1,
    borderColor: 'black',
    marginBottom: 10,
  },
  picker: {
    height:40,
    borderWidth:1,
    borderColor: 'black',
    marginBottom: 10,
  }
});
