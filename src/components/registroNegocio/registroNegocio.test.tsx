import { firebase } from '../../../__mocks__/firebase-auth-mock';
import { firebase as firebaseFirestore } from '../../../__mocks__/firebase-firestore-mock';
import { Alert } from 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, { act } from 'react-test-renderer';
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import RegistroNegocio, {useElements} from './index';
import { renderHook } from "@testing-library/react-hooks";


//constantes para renderizado
const navigation: any = {
    navigate: (path: string) => {}
};
const route: any = null;

//spy en los eventos de alerta
jest.spyOn(Alert, 'alert');

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
        const passwordInputC = getByTestId('passwordc');
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

        act(() => { fireEvent.changeText(telefonoInput, telefono) })
        //@ts-ignore
        expect(telefonoInput).toHaveProp('value', telefono);

        act(() => { fireEvent.changeText(NombreInput, nombre) })
        //@ts-ignore
        expect(NombreInput).toHaveProp('value', nombre);
    });

    describe('Focus en los elementos', () => {
        const {result} = renderHook(() => useElements({navigation}))
        result.current.passwordField.focus();
        result.current.passwordcField.focus();
        result.current.nombreField.focus();
        result.current.telefonoField.focus();
    });

    test('Debe navegar hacia la pantalla de login', async () => {
        const { getByTestId, } = render(
            <RegistroNegocio navigation={navigation} route={route} />
        );
        const registerButton = getByTestId('redirectLogin');
        act(() => fireEvent.press(registerButton))
        
    })

    test('Error al iniciar si los datos', async() => {
        const { getByTestId, } = render(
            <RegistroNegocio navigation={navigation} route={route} />
        );
        const regButton = getByTestId('registrar');
        act(() => fireEvent.press(regButton))

        expect(Alert.alert).toHaveBeenCalledWith('Datos faltantes', 'Todos los datos son obligatorios');
    })

    test('Contraseñas no coinciden', async() => {
        const { getByTestId, } = render(
            <RegistroNegocio navigation={navigation} route={route} />
        );
        const regButton = getByTestId('registrar');
        //act(() => fireEvent.press(regButton))
        const emailInput = getByTestId('email');
        const passwordInput = getByTestId('password');
        const passwordInputC = getByTestId('passwordc');
        const telefonoInput = getByTestId('telefono');
        const NombreInput = getByTestId('nombre');

        const email = 'correo@gmail.com';
        const telefono = '5552222';
        const nombre = 'TACOS PEREZ';

        act(() => { fireEvent.changeText(emailInput, email) })
        act(() => { fireEvent.changeText(passwordInput, 'contrasena') })
        act(() => { fireEvent.changeText(passwordInputC, 'nocontrasena') })
        act(() => { fireEvent.changeText(telefonoInput, telefono) })
        act(() => { fireEvent.changeText(NombreInput, nombre) })    
        
        act(() => fireEvent.press(regButton))

        expect(Alert.alert).toHaveBeenCalledWith('Datos incorrectos', 'Contraseñas no coinciden');
    })

    test('Accion de registrar usuario existente', async () => {
        const { getByTestId, } = render(
            <RegistroNegocio navigation={navigation} route={route} />
        );
        const registerButton = getByTestId('redirectLogin');
        act(() => fireEvent.press(registerButton))

        let createUserWithEmailAndPassword = jest.fn(() => {
            return Promise.reject(new Error('email-already-in-use'));
        })

        //@ts-ignore
        jest.spyOn(firebase, 'auth').mockImplementation(() => {
            return { createUserWithEmailAndPassword }
        })


        const emailInput = getByTestId('email');
        const passwordInput = getByTestId('password');
        const passwordInputC = getByTestId('passwordc');
        const telefonoInput = getByTestId('telefono');
        const NombreInput = getByTestId('nombre');

        const email = 'pedidos@dominos.com';
        const password = 'password';
        const telefono = '5552222';
        const nombre = 'TACOS PEREZ';

        act(() => { fireEvent.changeText(emailInput, email) })
        act(() => { fireEvent.changeText(passwordInput, password) })
        act(() => { fireEvent.changeText(passwordInputC, password) })
        act(() => { fireEvent.changeText(telefonoInput, telefono) })
        act(() => { fireEvent.changeText(NombreInput, nombre) })    
        const regButton = getByTestId('registrar');            
        await act(async () => await fireEvent.press(regButton))
    })

    test('Accion de registrar una contrase;a debil', async () => {
        const { getByTestId, } = render(
            <RegistroNegocio navigation={navigation} route={route} />
        );
        const registerButton = getByTestId('redirectLogin');
        //act(() => fireEvent.press(registerButton))

        let createUserWithEmailAndPassword = jest.fn(() => {
            return Promise.reject(new Error('weak-password'));
        })

        //@ts-ignore
        jest.spyOn(firebase, 'auth').mockImplementation(() => {
            return { createUserWithEmailAndPassword }
        })


        const emailInput = getByTestId('email');
        const passwordInput = getByTestId('password');
        const passwordInputC = getByTestId('passwordc');
        const telefonoInput = getByTestId('telefono');
        const NombreInput = getByTestId('nombre');

        const email = 'pedidos@dominos.com';
        const password = 'password';
        const telefono = '5552222';
        const nombre = 'TACOS PEREZ';

        act(() => { fireEvent.changeText(emailInput, email) })
        act(() => { fireEvent.changeText(passwordInput, password) })
        act(() => { fireEvent.changeText(passwordInputC, password) })
        act(() => { fireEvent.changeText(telefonoInput, telefono) })
        act(() => { fireEvent.changeText(NombreInput, nombre) })    
        const regButton = getByTestId('registrar');            
        await act(async () => await fireEvent.press(regButton))
    })

    test('Accion de registrar un email invalido', async () => {
        const { getByTestId, } = render(
            <RegistroNegocio navigation={navigation} route={route} />
        );

        let createUserWithEmailAndPassword = jest.fn(() => {
            return Promise.reject(new Error('invalid-email'));
        })

        //@ts-ignore
        jest.spyOn(firebase, 'auth').mockImplementation(() => {
            return { createUserWithEmailAndPassword }
        })


        const emailInput = getByTestId('email');
        const passwordInput = getByTestId('password');
        const passwordInputC = getByTestId('passwordc');
        const telefonoInput = getByTestId('telefono');
        const NombreInput = getByTestId('nombre');

        const email = 'pedidos@dominos.com';
        const password = 'password';
        const telefono = '5552222';
        const nombre = 'TACOS PEREZ';

        act(() => { fireEvent.changeText(emailInput, email) })
        act(() => { fireEvent.changeText(passwordInput, password) })
        act(() => { fireEvent.changeText(passwordInputC, password) })
        act(() => { fireEvent.changeText(telefonoInput, telefono) })
        act(() => { fireEvent.changeText(NombreInput, nombre) })    
        const regButton = getByTestId('registrar');            
        await act(async () => await fireEvent.press(regButton))
    })


    test('Accion de registrar y devolver error', async () => {
        const { getByTestId, } = render(
            <RegistroNegocio navigation={navigation} route={route} />
        );

        let createUserWithEmailAndPassword = jest.fn(() => {
            return Promise.reject(new Error('unknow error'));
        })

        //@ts-ignore
        jest.spyOn(firebase, 'auth').mockImplementation(() => {
            return { createUserWithEmailAndPassword }
        })


        const emailInput = getByTestId('email');
        const passwordInput = getByTestId('password');
        const passwordInputC = getByTestId('passwordc');
        const telefonoInput = getByTestId('telefono');
        const NombreInput = getByTestId('nombre');

        const email = 'pedidos@dominos.com';
        const password = 'password';
        const telefono = '5552222';
        const nombre = 'TACOS PEREZ';

        act(() => { fireEvent.changeText(emailInput, email) })
        act(() => { fireEvent.changeText(passwordInput, password) })
        act(() => { fireEvent.changeText(passwordInputC, password) })
        act(() => { fireEvent.changeText(telefonoInput, telefono) })
        act(() => { fireEvent.changeText(NombreInput, nombre) })    
        const regButton = getByTestId('registrar');            
        await act(async () => await fireEvent.press(regButton))
    })

    test('Accion de registrar, guardar usuario y datos', async () => {
        const { getByTestId, } = render(
            <RegistroNegocio navigation={navigation} route={route} />
        );

        let createUserWithEmailAndPassword = jest.fn(() => {
            return Promise.resolve();
        })

        //@ts-ignore
        jest.spyOn(firebase, 'auth').mockImplementation(() => {
            return { createUserWithEmailAndPassword }
        })

        let collection = jest.fn(() => {
            return Promise.resolve();
        })

        //@ts-ignore
        jest.spyOn(firebaseFirestore, 'firestore').mockImplementation(() => {
            return { collection }
        })
        


        const emailInput = getByTestId('email');
        const passwordInput = getByTestId('password');
        const passwordInputC = getByTestId('passwordc');
        const telefonoInput = getByTestId('telefono');
        const NombreInput = getByTestId('nombre');

        const email = 'pedidos@dominos.com';
        const password = 'password';
        const telefono = '5552222';
        const nombre = 'TACOS PEREZ';

        act(() => { fireEvent.changeText(emailInput, email) })
        act(() => { fireEvent.changeText(passwordInput, password) })
        act(() => { fireEvent.changeText(passwordInputC, password) })
        act(() => { fireEvent.changeText(telefonoInput, telefono) })
        act(() => { fireEvent.changeText(NombreInput, nombre) })    
        const regButton = getByTestId('registrar');            
        await act(async () => await fireEvent.press(regButton))
    })

    
});



