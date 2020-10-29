import "../../../../__mocks__/react-redux-mock";
import React from "react";
import { Alert } from 'react-native';
import { renderHook } from "@testing-library/react-hooks";
import renderer from 'react-test-renderer';
import Receta, { Recipe } from '.';
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
})

