import '../../../__mocks__/firebase-firestore-mock';

import React from 'react';
import renderer, {act} from 'react-test-renderer';
import OrderCheckout from './orderCheckout.component';

// redux
import {Provider} from 'react-redux';
import {GlobalState} from '../../storage/global-state.interface';
import configureStore from 'redux-mock-store';
import {store} from '../../storage';

import Template from './orderCheckout.view';
import {fireEvent, render} from '@testing-library/react-native';
import CarItem from './CarItem/CarItem.component';
const mockStore = configureStore([]);

describe('Order confirmation screen component', () => {
  const route:any = null
  const navigation:any = null

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
        <OrderCheckout navigation={navigation} route={route}/>
      </Provider>)
  })

  test('Should renders view with no empty car', () => {
    cart.push({
      receta_id: 'idfalso',
      cantidad: 3
    })
    renderer.create(
      <Provider store={store}>
        <Template cart={cart} itemDetails={itemDetails} total={total} confirmacion={confirmacion}/>
      </Provider>
    )
  })

  test('Should navigate to confirmation screen', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Template cart={cart} itemDetails={itemDetails} total={total} confirmacion={confirmacion}/>
      </Provider>
    )
    const confirmationbtn = getByTestId('confirmationbtn');
    fireEvent.press(confirmationbtn)
  })
})

