import firebase from '../../../__mocks__/firebase-register-mock';
import firestore from '../../../__mocks__/firebase-firestore-mock'
import { Alert } from 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, { act } from 'react-test-renderer';
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import RegistroNegocio from './index';


//constantes para renderizado
const navigation: any = {
    navigate: (path: string) => {}
};
const route: any = null;

//Errores de registro
const AuthError = {
    emailExist : 'email-already-in-use',
    weakPassword: 'weak-password',
    invaidEmail: 'invalid-email'
}

describe('RegistroNegocio Component', () => {
    //renderizar correctamente, la primera prueba siempre retornara algo, por lo que estara correcta
    test('Debe renderizar correctamente', () => {
        act(() => {
            renderer.create(<RegistroNegocio navigation={navigation} route={route} />)
        })
    })

    test('Campos para auth vacios al iniciar', ()=>{
        const { getByTestId } = render(
            <RegistroNegocio navigation={navigation} route={route} />
        );
        //Obtengo objetos segun ID (campo testID)
        const emailInput = getByTestId('email');
        const passwordInput = getByTestId('password');
        const passwordCInput = getByTestId('passwordc');

        //@ts-ignore
        expect(emailInput).toHaveProp('value', '');
        //@ts-ignore
        expect(passwordInput).toHaveProp('value', '');
        //@ts-ignore
        expect(passwordCInput).toHaveProp('value', '');
    });

    test('Campos para datos del negocio vacios al iniciar', ()=>{
        const { getByTestId } = render(
            <RegistroNegocio navigation={navigation} route={route} />
        );
        //Obtengo objetos segun ID (campo testID)
        const nombre = getByTestId('nombre');
        const telefono = getByTestId('telefono');
        //@ts-ignore
        expect(nombre).toHaveProp('value', '');
        //@ts-ignore
        expect(telefono).toHaveProp('value', '');
    });

    //ver
    test('Verificar el cambio de valores con los inputs', () => {
        const { getByTestId, } = render(
            <RegistroNegocio navigation={navigation} route={route} />
        );

        const emailInput = getByTestId('email');
        const passwordInput = getByTestId('password');
        const passwordInputC = getByTestId('passwordC');
        const telefonoInput = getByTestId('telefono');
        const NombreInput = getByTestId('nombre');

        const email = 'correo@gmail.com';
        const password = 'password';
        const telefono = '5552222';
        const nombre = 'TACOS PEREZ';

        act(() => { fireEvent.changeText(emailInput, email) })
        //@ts-ignore
        expect(emailInput).toHaveProp('value', email);

        act(() => { fireEvent.changeText(passwordInput, password) })
        //@ts-ignore
        expect(passwordInput).toHaveProp('value', password);

        act(() => { fireEvent.changeText(passwordInputC, password) })
        //@ts-ignore
        expect(passwordInputC).toHaveProp('value', password);

        act(() => { fireEvent.changeText(telefonoInput, password) })
        //@ts-ignore
        expect(telefonoInput).toHaveProp('value', telefono);

        act(() => { fireEvent.changeText(NombreInput, nombre) })
        //@ts-ignore
        expect(NombreInput).toHaveProp('value', nombre);
    });
});
