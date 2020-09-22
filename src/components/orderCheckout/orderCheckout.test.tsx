//import '../__mocks__/firebase-auth-mock';

import React from 'react';
import renderer from 'react-test-renderer'
import OrderCheckout from './orderCheckout.component';

// redux
import {Provider} from 'react-redux';
import {GlobalState} from '../../storage/global-state.interface';
import configureStore from 'redux-mock-store';
import {store} from '../../storage';
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

  //Configure redux
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders', () => {
    renderer.create(
      <Provider store={store}>
        <OrderCheckout navigation={navigation} route={route}/>
      </Provider>)
  })
})

