import React from 'react';
import {createStackNavigator, StackHeaderProps, StackScreenProps} from '@react-navigation/stack';
import {Button, Text, View} from 'react-native';
import {CartStackParamList} from '../types';
import OrderCheckout from '../../components/orderCheckout'
import OrderConfirmation from '../../components/orderConfirmation';
const Stack = createStackNavigator<CartStackParamList>();

export default function CartNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Cart'} component={ExampleCart} />
      <Stack.Screen name={'OrderCheckout'} component={OrderCheckout} />
      <Stack.Screen name={'OrderConfirmation'} component={OrderConfirmation} />
    </Stack.Navigator>
  );
}

function ExampleCart({navigation}:StackScreenProps<CartStackParamList,'Cart'>) {
  const pressHandler = () => { navigation.navigate('OrderCheckout') }
  return (
    <View>
      <Text>Cart with all the products</Text>
        <Button title={'Carrito de compras'} onPress={pressHandler}/>
    </View>
  );
}
