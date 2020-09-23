import {Text,ScrollView, TextInput, TouchableHighlight, View} from 'react-native';
import {styles} from '../../Style';
import {Picker} from '@react-native-community/picker';
import React, {PropsWithChildren} from 'react';

export default function Template({
  customerInformation,
  total,
  pressHandler}:PropsWithChildren<any>){
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
          <TouchableHighlight
            testID={"confirmationbtn"}
            style={styles.btn} onPress={pressHandler}>
            <Text style={styles.textButton}>Terminar pedido</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    </View>
  );
}
