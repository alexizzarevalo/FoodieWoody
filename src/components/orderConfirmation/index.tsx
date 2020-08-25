import React, {PropsWithRef, useState} from 'react';
import {
  createStackNavigator,
  StackHeaderInterpolatedStyle,
  StackHeaderProps,
  StackHeaderTitleProps
} from '@react-navigation/stack';
import {Button,ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Picker} from "@react-native-community/picker";
import {StackHeaderOptions} from "@react-navigation/stack/lib/typescript/src/types";

export default function orderConfirmation({route, navigation}:StackHeaderProps) {
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
            <Picker
              selectedValue={selectedValue}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue.toString())}
            >
              {costumerInformation.direcciones.map((d)=>{
                return(
                  <Picker.Item label={d.direccion} value={d.direccion} key={d.key} />
                );
              })}
            </Picker>
            <Text style={styles.label} >Metodo de pago</Text>
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
  },
  label:{

  },
  input:{

  },
  picker: {
    height: 50,
    width: '100%'
  }
});
