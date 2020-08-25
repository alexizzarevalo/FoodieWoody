import React from 'react';
import {createStackNavigator, StackHeaderProps} from '@react-navigation/stack';
import {Button, Text, View} from 'react-native';
import {CartStackParamList} from '../types';
import OrderConfirmation from '../../components/orderConfirmation';
const Stack = createStackNavigator<CartStackParamList>();

export default function CartNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Cart'} component={ExampleCart} />
      <Stack.Screen name={'CheckOut'} component={OrderCheckOut} />
      <Stack.Screen name={'OrderConfirmation'} component={OrderConfirmation} />
    </Stack.Navigator>
  );
}
function ExampleCart({navigation}:StackHeaderProps) {
  const pressHandler = () =>{ navigation.navigate('CheckOut') }
  return (
    <View>
      <Text>Cart with all the products</Text>
        <Button title={'Carrito de compras'} onPress={pressHandler}/>
    </View>
  );
}

function OrderCheckOut({navigation}:StackHeaderProps) {
  const pressHandler = () =>{ navigation.navigate('OrderConfirmation', {total:100}) }
  return (
    <View>
      <Text>Shopping cart</Text>
      <Button title={'Confirmar pedido'} onPress={pressHandler}/>
    </View>
  );
}
