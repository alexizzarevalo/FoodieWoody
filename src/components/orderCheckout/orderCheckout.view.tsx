import React, {PropsWithChildren} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../../Style';
import CarItem from './CarItem/CarItem.component';

export default function Template({cart,itemDetails,total,confirmacion}:PropsWithChildren<any>){
  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={({item,index} )=>{ return(
          <CarItem
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
        testID={'confirmationbtn'}
        style={styles.btn}
        onPress={()=>confirmacion}
      >
        <Text style={styles.textButton}>Confirmar Orden</Text>
      </TouchableOpacity>
    </View>)
}
