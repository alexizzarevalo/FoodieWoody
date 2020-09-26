import '../../../__mocks__/firebase-firestore-mock';
import { firebase, FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import React from 'react';
import renderer, {act} from 'react-test-renderer';
import CrearReceta from '../crearReceta/crearReceta.component';
import {fireEvent, render} from '@testing-library/react-native';
import crearReceta from '../crearReceta/crearReceta.component';

//@ts-ignore
jest.spyOn(firebase, 'firestore').mockImplementation(() => {
    return { onAuthStateChanged :()=> {
        return Promise.resolve()
    }}
})


describe('crearReceta screen component', () => {
      //props
  const route:any = {
    params:{
      total: 1000
    }
  }
  const navigation:any = {
    navigate: (id:string) => { return Promise.resolve()}
  }
  test('Should renders without crashing', () => {
    renderer.create(
        <CrearReceta navigation={navigation} route={route}/>)
  })

  test('Should navigate to Search again', ()=>{
    const {getByTestId} = render(
        <CrearReceta navigation={navigation} route={route}/>)
    const btnCrear = getByTestId('btnCrear')
    fireEvent.press(btnCrear)
  })
})