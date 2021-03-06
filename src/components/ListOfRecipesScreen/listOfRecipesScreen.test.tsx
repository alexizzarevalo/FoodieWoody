import '../../../__mocks__/firebase-firestore-mock';
import '../../../__mocks__/firebase-auth-mock';
import "../../../__mocks__/react-redux-mock";
import { firebase } from "@react-native-firebase/auth";
import { firebase as firebaseStore, FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import React, { useState } from 'react';
import { Alert } from 'react-native';
import * as state from './state';
//{ useElements, SetRecetas, filterRecetas }
import { renderHook, act } from '@testing-library/react-hooks';
import renderer from "react-test-renderer";
import { Recipe } from './Receta';
import SearchScreen from '.';
import { waitFor } from '@testing-library/react-native';

jest.spyOn(Alert, 'alert');

const navigation: any = null;
const route: any = null;

const getReceta = (data: object) => {
  return {
    descripcion: 'Pizza hawaiana',
    id: '1',
    imagen: 'https://www.laespanolaaceites.com/wp-content/uploads/2019/06/pizza-con-chorizo-jamon-y-queso-1080x671.jpg',
    negocio_id: '1',
    nombre: 'pizza',
    pasos: [],
    precio: 50,
    ingredientes: [],
    tiempo_preparacion: 0,
    ...data
  }
}

//@ts-ignore
jest.spyOn(firebase, 'auth').mockImplementation(() => {
  return {
    onAuthStateChanged: jest.fn(() => {
    })
  }
})

//@ts-ignore
jest.spyOn(firebaseStore, 'firestore').mockImplementation(() => ({
  collection: jest.fn(() => ({
    where: jest.fn(() => ({
      get: jest.fn(() => {
        const snapshot: FirebaseFirestoreTypes.QuerySnapshot = {
          docs: [
            //@ts-ignore
            {
              data: () => {
                return getReceta({ id: "1" });
              },
              id: '1',
            },
            //@ts-ignore
            {
              data: () => {
                return getReceta({ id: "2" });
              },
              id: '2',
            }

          ],
        }
        return Promise.resolve(snapshot);
      })
    })),
  }))
}))

describe('Pantalla SearchScreen', () => {
  test('La pantalla debe renderizar correctamente sin el cuadro de busqueda', () => {
    jest.useFakeTimers();
    renderer.create(<SearchScreen navigation={navigation} route={route} />)
  })

  test('La pantalla debe renderizar correctamente con el cuadro de busqueda', () => {
    jest.useFakeTimers();
    renderer.create(<SearchScreen navigation={navigation} route={route} showSearch={true} />)
  })

  describe('Estados de la pantalla', () => {
    test('Debe actualizar las recetas', async () => {
      const { result } = renderHook(() => {
        const [recetas, setRecetas] = useState<Recipe[]>([]);
        const [busqueda, setBusqueda] = useState<Recipe[]>([]);
        const [loading, setLoading] = useState<boolean>(false);

        const actualizarRecetas = (recetas: Recipe[]) => {
          setRecetas(recetas);
          setBusqueda(recetas);
        }

        return { setRecetas, setBusqueda, setLoading, recetas, busqueda, loading, actualizarRecetas }
      })

      await act(async () => state.SetRecetas(result.current.setLoading, result.current.actualizarRecetas, 'id'))

      expect(result.current.recetas.length).toBe(2);
      expect(result.current.recetas).toEqual([getReceta({ id: '1' }), getReceta({ id: '2' })]);
    })

    test('Debe ejecutarse el hook y cargar el estado inicial: useEffects', () => {
      const { result, waitFor } = renderHook(() => state.useElements({ navigation }));

      expect(result.current.search.value).toBe("");
      waitFor(() => {
        return expect(result.current.recetas).toEqual([getReceta({ id: '1' }), getReceta({ id: '2' })])
      })
    })

    test('Debe limpiarse la busqueda cuando se presiona el icono', async () => {
      const { result } = renderHook(() => state.useElements({ navigation }));

      await act(async () => result.current.search.icon.onPress());

      expect(result.current.search.value).toBe('');
      expect(result.current.search.showInput).toBeTruthy();

      await act(async () => result.current.search.icon.onPress());

      expect(result.current.search.value).toBe('');
      expect(result.current.search.showInput).toBeFalsy();
    })

    test('Debe empujarse la pantalla de agregar una receta en el stack navigation', async () => {
      const navigation = {
        push: jest.fn((screenName: string) => {
          expect(screenName).toBe('CreateAndUpdateRecipe');
        })
      };
      //@ts-ignore
      const { result } = renderHook(() => state.useElements({ navigation }));

      result.current.addIcon.onPress();

      expect(navigation.push).toBeCalled();
    })

    test('Deben filtrar las recetas por nombre y por descripcion', async () => {
      const resultByName = state.filterRecetas([getReceta({}), getReceta({})], 'pizza');
      expect(resultByName.length).toBe(2);

      const resultByDescription = state.filterRecetas([getReceta({}), getReceta({})], 'hawaiana');
      expect(resultByDescription.length).toBe(2);
    })
  })
})

