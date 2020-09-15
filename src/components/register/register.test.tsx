import '../../../__mocks__/firebase-auth-mock';
import { Alert } from 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, { act } from 'react-test-renderer';
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import RegisterN from '.';

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

        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');
        const passwordcInput = getByTestId('passwordInput');
        const addressInput = getByTestId('passwordInput');
        const nameInput = getByTestId('passwordInput');
        const phoneInput = getByTestId('passwordInput');

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

        expect(Alert.alert).toHaveBeenCalledWith('Datos faltantes', 'Debes agregar un correo y una contraseña');
    })

    test('El boton de login debe tener un texto "Iniciar sesión"', async () => {
        const { getByTestId, } = render(
            <LoginScreen navigation={navigation} route={route} />
        );

        const loginButton = getByTestId('loginButton');
        const loginButtonText = getByTestId('loginButtonText');

        //@ts-ignore
        expect(loginButtonText).toHaveTextContent('Iniciar sesión');
        //@ts-ignore
        expect(loginButton).toContainElement(loginButtonText);
    })

    test('Debe ejecutar la funcion de auth de firebase', async () => {
        const { getByTestId, } = render(
            <LoginScreen navigation={navigation} route={route} />
        );

        const loginButton = getByTestId('loginButton');

        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');

        const email = 'dalexis.da@gmail.com';
        const password = 'password';

        fireEvent.changeText(emailInput, email);
        fireEvent.changeText(passwordInput, password);

        fireEvent.press(loginButton);
        // act(() => {
        // })
        // const activityIndicator = await waitFor(() => getByTestId('activityIndicator'));
        // // @ts-ignore
        // expect(loginButton).toContainElement(activityIndicator);
    })
});

