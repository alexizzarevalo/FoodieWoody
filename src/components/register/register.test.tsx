import firebase from '../../../__mocks__/firebase-register-mock';
import { Alert } from 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, { act } from 'react-test-renderer';
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import RegisterN, {respuesta, addDetails} from '.';

jest.spyOn(Alert, 'alert');
const navigation: any = null;
const route: any = null;

describe('Register Component', () => {
    test('Debe renderizar correctamente', () => {
        renderer.create(<RegisterN navigation={navigation} route={route} />)
    })

    test('Los campos deben estar vacios al iniciar', () => {
        const { getByTestId } = render(
            <RegisterN navigation={navigation} route={route} />
        );

        const email = getByTestId('email');
        const password = getByTestId('password');
        const passwordc = getByTestId('passwordc');
        const name = getByTestId('name');
        const address = getByTestId('address');
        const phone = getByTestId('phone');

        //@ts-ignore
        expect(email).toHaveProp('value', '');
        //@ts-ignore
        expect(password).toHaveProp('value', '');
        //@ts-ignore
        expect(passwordc).toHaveProp('value', '');
        //@ts-ignore
        expect(name).toHaveProp('value', '');
        //@ts-ignore
        expect(address).toHaveProp('value', '');
        //@ts-ignore
        expect(phone).toHaveProp('value', '');
    });

    test('El campo de contraseña debe estar en modo seguro', () => {
        const { getByTestId } = render(
            <RegisterN navigation={navigation} route={route} />
        );
        const password = getByTestId('password');
        const passwordc = getByTestId('passwordc');
        //@ts-ignore
        expect(password).toHaveProp('secureTextEntry', true);
        //@ts-ignore
        expect(passwordc).toHaveProp('secureTextEntry', true);
    })

    test('Las variables cambian cuando el campo cambia de valor', () => {
        const { getByTestId, } = render(
            <RegisterN navigation={navigation} route={route} />
        );

        const emailInput = getByTestId('email');
        const passwordInput = getByTestId('password');
        const passwordcInput = getByTestId('passwordc');
        const addressInput = getByTestId('address');
        const nameInput = getByTestId('name');
        const phoneInput = getByTestId('phone');

        const email = 'p.casiano33@gmail.com';
        const password = 'Abc123';
        const passwordc = 'Abc123';
        const address = 'Zona 12';
        const name = 'Paola Casiano';
        const phone = '00000000';

        fireEvent.changeText(emailInput, email);
        fireEvent.changeText(passwordInput, password);
        fireEvent.changeText(passwordcInput, passwordc);
        fireEvent.changeText(nameInput, name);
        fireEvent.changeText(addressInput, address);
        fireEvent.changeText(phoneInput, phone);

        //@ts-ignore
        expect(emailInput).toHaveProp('value', email);
        //@ts-ignore
        expect(passwordInput).toHaveProp('value', password);
        //@ts-ignore
        expect(passwordcInput).toHaveProp('value', passwordc);
        //@ts-ignore
        expect(nameInput).toHaveProp('value', name);
        //@ts-ignore
        expect(addressInput).toHaveProp('value', address);
        //@ts-ignore
        expect(phoneInput).toHaveProp('value', phone);
    });

    test('Debe mostrar una alerta cuando registrarse sin escribir sus datos', async () => {
        const { getByTestId, } = render(
            <RegisterN navigation={navigation} route={route} />
        );

        const regbtn = getByTestId('registerBtn');

        fireEvent.press(regbtn);
        expect(Alert.alert).toHaveBeenCalledWith('Campos obligatorios', 'Todos los campos son obligatorios')
    })
        
    test('Contraseñas no coinciden', async () => {
        const { getByTestId, } = render(
            <RegisterN navigation={navigation} route={route} />
        );

        const regbtn = getByTestId('registerBtn');

        const emailInput = getByTestId('email');
        const passwordInput = getByTestId('password');
        const passwordCInput = getByTestId('passwordc');
        const nameInput = getByTestId('name');
        const addressInput = getByTestId('address');
        const phoneInput = getByTestId('phone');
        

        const email = 'p.casiano3377a@gmail.com';
        const password = 'password';
        const passwordC = 'passwordc';
        const name = 'Paola Casiano';
        const phone = '52659927';
        const addres = 'Ciudad';

        fireEvent.changeText(emailInput, email);
        fireEvent.changeText(passwordInput, password);
        fireEvent.changeText(passwordCInput, passwordC);
        fireEvent.changeText(nameInput, name);
        fireEvent.changeText(phoneInput, phone);
        fireEvent.changeText(addressInput, addres);

        fireEvent.press(regbtn);
        expect(Alert.alert).toHaveBeenCalledWith('Contraseñas','Las contraseñas no coinciden')
        // act(() => {
        // })
        // const activityIndicator = await waitFor(() => getByTestId('activityIndicator'));
        // // @ts-ignore
        // expect(loginButton).toContainElement(activityIndicator);
    });

    test('Registrar un usuario', async () => {
        const createUserWithEmailAndPassword = jest.fn(()=>{
            return Promise.resolve();
        });
        //@ts-ignore
        jest.spyOn(firebase, 'auth').mockImplementation(() => {
            return { createUserWithEmailAndPassword }
        });

        const { getByTestId, } = render(
            <RegisterN navigation={navigation} route={route} />
        );

        const regbtn = getByTestId('registerBtn');

        let random = Math.floor(Math.random() * 1000);
        const emailInput = getByTestId('email');
        const passwordInput = getByTestId('password');
        const passwordCInput = getByTestId('passwordc');
        const nameInput = getByTestId('name');
        const addressInput = getByTestId('address');
        const phoneInput = getByTestId('phone');
        

        const email = random + '@gmail.com';
        const password = 'password';
        const passwordC = 'password';
        const name = 'User ' + random;
        const phone = '52659927';
        const addres = 'Ciudad';

        act(() =>fireEvent.changeText(emailInput, email));
        act(() =>fireEvent.changeText(passwordInput, password));
        act(() =>fireEvent.changeText(passwordCInput, passwordC));
        act(() =>fireEvent.changeText(nameInput, name));
        act(() =>fireEvent.changeText(phoneInput, phone));
        act(() =>fireEvent.changeText(addressInput, addres));

        
        await act(async () => await fireEvent.press(regbtn))
    })
});

