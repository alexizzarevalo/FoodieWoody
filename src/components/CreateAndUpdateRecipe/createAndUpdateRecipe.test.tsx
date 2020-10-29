import '../../../__mocks__/firebase-firestore-mock';
import '../../../__mocks__/firebase-auth-mock';
import { firebase } from "@react-native-firebase/auth";
import { firebase as firebaseStore, FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import React, { useState } from 'react';
import renderer from "react-test-renderer";
import { Alert } from 'react-native';
import useCreateAndUpdateRecipeState from './state';
import { renderHook, act } from '@testing-library/react-hooks';
import { Recipe, defaultRecipe } from '../../models/recipe';
import SearchScreen from '.';

jest.spyOn(Alert, 'alert');

const navigation: any = null;

const getReceta = (data: object) => {
    const recipe: Recipe = {
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
    return recipe;
}

//@ts-ignore
// jest.spyOn(firebase, 'auth').mockImplementation(() => {
//   return {
//     onAuthStateChanged: jest.fn(() => {
//     })
//   }
// })

//@ts-ignore
jest.spyOn(firebaseStore, 'firestore').mockImplementation(() => ({
    collection: jest.fn(() => ({
        doc: jest.fn(() => ({
            get: jest.fn(() => {
                //@ts-ignore
                const snapshot: FirebaseFirestoreTypes.DocumentSnapshot = {
                    data: () => {
                        return getReceta({ id: "1" });
                    },
                    id: '1',
                }
                return Promise.resolve(snapshot);
            })
        })),
    }))
}))

describe('Pantalla Crear y Actualizar Receta', () => {
    test('La pantalla debe renderizar correctamente en modo: Crear nueva receta', async () => {
        jest.useFakeTimers();
        const route = {
            params: {} // Dado que no hay id, se creara una receta
        }
        //@ts-ignore
        await act(async () => renderer.create(<SearchScreen navigation={navigation} route={route} />))
    })

    test('La pantalla debe renderizar correctamente en modo: Actualizar receta', async () => {
        jest.useFakeTimers();
        const route = {
            params: { id: 'xhdi8fnb' } // Dado que si hay id, se actualizara la receta
        }
        //@ts-ignore
        await act(async () => renderer.create(<SearchScreen navigation={navigation} route={route} />))
    })

    describe('Estados de la pantalla', () => {
        test('Estado inicial de la pantalla cuando es modo: Crear receta', () => {
            const route = {
                params: {} // Dado que no hay id, se creara una receta
            }
            //@ts-ignore
            const { result, waitFor } = renderHook(() => useCreateAndUpdateRecipeState({ navigation, route }));
            expect(result.current.update).toBe(false);
            expect(result.current.canSaveOrUpdate()).toBe(false);
            waitFor(() => expect(result.current.loading).toBe(false));
        })
    })
})

