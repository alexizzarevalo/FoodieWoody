import '../../../__mocks__/firebase-firestore-mock';
import firebaseAuthMock, { firebase } from '../../../__mocks__/firebase-auth-mock';
import React from 'react';
import renderer, {act} from 'react-test-renderer';
import OrderConfirmation from '../orderConfirmation/orderConfirmation.component';

// redux
import {Provider} from 'react-redux';
import {GlobalState} from '../../storage/global-state.interface';
import configureStore from 'redux-mock-store';
import {store} from '../../storage';
import {fireEvent, render} from '@testing-library/react-native';
const mockStore = configureStore([]);

describe('Order confirmation screen component', () => {
  //@ts-ignore
  jest.spyOn(firebase, 'auth').mockImplementation(() => {
    return { onAuthStateChanged :()=> {
        return Promise.resolve()
    }}
  })

  //props
  const route:any = {
    params:{
      total: 1000
    }
  }
  const navigation:any = {
    navigate: (id:string) => { return Promise.resolve()}
  }

  // redux
  let store:any = null;
  const initialState: GlobalState = {
    cart: [],
    search: '',
  }

  const cart:any = []
  const itemDetails:any = []
  const total = 56
  const confirmacion = () => { }

  //Configure redux
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('Should renders without crashing', () => {
    renderer.create(
      <Provider store={store}>
        <OrderConfirmation navigation={navigation} route={route}/>)
      </Provider>)
  })

  test('Should navigate to Search again', ()=>{
    const {getByTestId} = render(
      <Provider store={store}>
        <OrderConfirmation navigation={navigation} route={route}/>)
      </Provider>)
    const confirmationbtn = getByTestId('confirmationbtn')
    fireEvent.press(confirmationbtn)
  })
})
