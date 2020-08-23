import React, { Component } from 'react';
import ListLayout from '../../listlayout'
import {StatusBar, SafeAreaView, FlatList, View, StyleSheet, Text } from 'react-native';

class CheckoutScreen extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      categories : [
        {
          id: 3,
          name: 'Cookies',
          photo_url:
          'https://www.telegraph.co.uk/content/dam/Travel/2019/January/france-food.jpg?imwidth=1400',
          key: '0'
        },
        {
          id: 1,
          name: 'Mexican Food',
          photo_url: 'https://ak1.picdn.net/shutterstock/videos/19498861/thumb/1.jpg',
          key: '1'
        },
        {
          id: 2,
          name: 'Italian Food',
          photo_url:
            'https://images.unsplash.com/photo-1533777324565-a040eb52facd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            key: '2'
        },
        {
          id: 3,
          name: 'Smoothies',
          photo_url:
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/still-life-of-three-fresh-smoothies-in-front-of-royalty-free-image-561093647-1544042068.jpg?crop=0.715xw:0.534xh;0.0945xw,0.451xh&resize=768:*',
          key: '3'
        },
        {
          id: 4,
          name: 'Pizza',
          photo_url: 'https://amp.businessinsider.com/images/5c084bf7bde70f4ea53f0436-750-563.jpg',
          key: '4'
        },
      ]
    }
  }

  separador = () => {
    return(
      <View
        style={styles.separador}
      ></View>
    )
  }
  
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data = {this.state.categories}
          renderItem ={ ({item}) => <ListLayout data={item}></ListLayout> }
          horizontal = {false}
          ItemSeparatorComponent = {this.separador}
          ListEmptyComponent = { <Text style={{ marginTop :40 }}> No hay elementos en la lista</Text>}
        ></FlatList>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  separador : {
    height : 5,
    width : '100%',
    backgroundColor : 'black',
    marginVertical : 10
  }
});

export default CheckoutScreen;