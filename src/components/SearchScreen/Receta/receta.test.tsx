import "../../../../__mocks__/firebase-firestore-mock";
import "../../../../__mocks__/firebase-auth-mock";
import "../../../../__mocks__/react-redux-mock";
import React from "react";
import { Alert } from 'react-native';
import { renderHook } from "@testing-library/react-hooks";
import renderer from 'react-test-renderer';
import Receta, { Recipe } from '.';
import { useRecetaElements } from './state';
import { useDispatch } from "react-redux";

jest.spyOn(Alert, 'alert');

const nav = {
    navigate: jest.fn()
};

const recetaProp: Recipe = {
    descripcion: 'Pizza hawaiana',
    id: '1',
    imagen: 'imagen',
    negocio_id: '1',
    nombre: 'pizza',
    pasos: [],
    precio: 50,
    ingredientes: [],
    tiempo_preparacion: 0
}

describe('Componente de receta', () => {

    test('Debe renderizar correctamente el componente', () => {
        //@ts-ignore
        renderer.create(<Receta nav={nav} receta={recetaProp} />)
    })

    describe('Hook: useRecetaElements', () => {

        test('Debe navegar a la pantalla DetalleReceta con la receta correcta', () => {
            nav.navigate.mockImplementation((name, { receta }) => {
                expect(name).toBe('DetalleReceta');
                expect(receta).toBe(recetaProp);
            })

            //@ts-ignore
            const { result } = renderHook(() => useRecetaElements({ receta: recetaProp, nav }));

            result.current.goToDetails();
            expect(nav.navigate).toBeCalledTimes(1);
        })

        test('Debe llamar a la accion ADD_TO_CART con el id de la receta y cantidad de 1', () => {
            const dispatch = jest.fn().mockImplementation(({ type, payload }) => {
                expect(type).toBe('ADD_TO_CART');
                expect(payload).toEqual({ cantidad: 1, receta_id: recetaProp.id });
            });

            //@ts-ignore
            useDispatch.mockImplementation(() => {
                return dispatch;
            })

            //@ts-ignore
            const { result } = renderHook(() => useRecetaElements({ receta: recetaProp, nav }));
            result.current.addToCart();

            expect(Alert.alert).toBeCalledTimes(1);
            //@ts-ignore
            Alert.alert.mock.calls[0][2][1].onPress();
        })
    });
})

