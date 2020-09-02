import React, { Component } from 'react';
import ListLayout from './listlayout'
import {StatusBar, FlatList, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {CartStackParamList} from '../../navigation/types';

export default function OrderCheckout(
  {route,navigation}:StackScreenProps<CartStackParamList,'OrderCheckout'>) {
  const confirmacion = () => {
    navigation.navigate('OrderConfirmation')
  }
  return (
    <View style={styles.container}>
      {/*<View style={styles.lista}>
          <FlatList
          data = {this.state.categories}
          renderItem ={ ({item}) => <ListLayout data={item}></ListLayout> }
          horizontal = {false}
          ListEmptyComponent = { <Text style={{ marginTop :40 }}> No hay elementos en la lista</Text>}
          contentContainerStyle={{paddingBottom:80}}
        ></FlatList>
      </View>
      */}
      <View style={styles.otro}>
        <TouchableOpacity
          style={styles.contenedorboton}
          onPress={confirmacion}
        >
          <Text style={styles.textoboton}>Confirmar Orden</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
{/*this.state = {
      categories : [
        {
          id: 3,
          name: 'Galletas',
          cantidad: '1',
          photo_url:
          'https://www.telegraph.co.uk/content/dam/Travel/2019/January/france-food.jpg?imwidth=1400',
          key: '0'
        },
        {
          id: 1,
          name: 'Coquita con Hielo',
          cantidad: '5',
          photo_url: 'https://ak1.picdn.net/shutterstock/videos/19498861/thumb/1.jpg',
          key: '1'
        },
        {
          id: 2,
          name: 'Spaguetti',
          cantidad: '11',
          photo_url:
            'https://images.unsplash.com/photo-1533777324565-a040eb52facd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            key: '2'
        },
        {
          id: 3,
          name: 'Smoothies',
          cantidad: '2',
          photo_url:
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/still-life-of-three-fresh-smoothies-in-front-of-royalty-free-image-561093647-1544042068.jpg?crop=0.715xw:0.534xh;0.0945xw,0.451xh&resize=768:*',
          key: '3'
        },
        {
          id: 4,
          name: 'Pizza',
          cantidad: '3',
          photo_url: 'https://amp.businessinsider.com/images/5c084bf7bde70f4ea53f0436-750-563.jpg',
          key: '4'
        },
      ]
    }
  }*/}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
});
