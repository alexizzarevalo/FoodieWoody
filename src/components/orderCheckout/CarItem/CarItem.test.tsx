import React from 'react';
import renderer, {act} from 'react-test-renderer';
import { render, fireEvent } from "@testing-library/react-native";
import CarItem from './CarItem.component';
// redux
import {Provider} from 'react-redux';
import {GlobalState} from '../../../storage/global-state.interface';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe('Card Item component', () => {
  //props
  const nombre = 'itemTest'
  const precio = 45.5
  const image = 'path'
  const receta_id = 1
  const cantidad = 1

  // redux
  let store:any = null;
  const initialState: GlobalState = {
    cart: [],
    search: '',
  }

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('Deberia renderizar de forma correcta', () => {
    renderer.create(
      <Provider store={store}>
        <CarItem nombre={nombre}
                 precio={precio}
                 imagen={image}
                 receta_id={receta_id}
                 cantidad={cantidad}/>
      </Provider>
    )
  })

  test('Deberia llamar al metodo dispatch cantidad y disminuir la cantidad', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CarItem nombre={nombre}
                 precio={precio}
                 imagen={image}
                 receta_id={receta_id}
                 cantidad={cantidad}/>
      </Provider>
    )
    const btnDec = getByTestId('dec_quantity');
    act(() => fireEvent.press(btnDec))
  })

  test('Deberia llamar al metodo dispatch cantidad y aumentar la cantidad', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CarItem nombre={nombre}
                 precio={precio}
                 imagen={image}
                 receta_id={receta_id}
                 cantidad={cantidad}/>
      </Provider>
    )
    const btnInc = getByTestId('inc_quantity');
    act(() => fireEvent.press(btnInc))
  })
})
