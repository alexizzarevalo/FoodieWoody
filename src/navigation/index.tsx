import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CartNavigation from './cart_Navigation';
import LoginScreen from "../components/loginScreen";
import useUser from '../hooks/useUser';
import SearchNavigation from './search_Navigation';
import RegisterN from '../components/register';
import {DrawerParamList} from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function Navigation() {
  const { isLogged } = useUser();

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerType={'back'}>
        {
          !isLogged ?
            <>
              <Drawer.Screen options={{ title: 'Iniciar sesión' }} name={'Login'} component={LoginScreen} />
              <Drawer.Screen name={'Register'} component={RegisterN} />
            </>
            :
            <>
              <Drawer.Screen name={'Cart'} component={CartNavigation} />
              <Drawer.Screen name={'Search'} component={SearchNavigation} />
              {/*Agregar aqui las demas pantallas*/}
            </>
        }
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
